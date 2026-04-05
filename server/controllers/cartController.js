const pool = require('../config/db');

// ═══════ GET OR CREATE CART ═══════
const getOrCreateCart = async (userId, sessionId) => {
  let cart;

  if (userId) {
    // Try to find user's existing cart
    const result = await pool.query(
      `SELECT * FROM carts WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );
    cart = result.rows[0];
  } else if (sessionId) {
    // Try to find session cart
    const result = await pool.query(
      `SELECT * FROM carts WHERE session_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [sessionId]
    );
    cart = result.rows[0];
  }

  if (!cart) {
    // Create new cart
    const result = await pool.query(
      `INSERT INTO carts (user_id, session_id) VALUES ($1, $2) RETURNING *`,
      [userId || null, sessionId || null]
    );
    cart = result.rows[0];
  }

  return cart;
};

// ═══════ GET CART WITH ITEMS ═══════
exports.getCart = async (req, res) => {
  try {
    const userId = req.query.userId || null;
    const sessionId = req.query.sessionId || null;

    if (!userId && !sessionId) {
      return res.status(400).json({ success: false, message: 'userId or sessionId required' });
    }

    const cart = await getOrCreateCart(userId, sessionId);

    // Get cart items with product details
    const itemsRes = await pool.query(`
      SELECT 
        ci.id as cart_item_id,
        ci.quantity,
        pv.id as variant_id,
        pv.size,
        pv.color,
        pv.price,
        pv.stock_quantity,
        p.id as product_id,
        p.name as product_name,
        p.image_url,
        p.description
      FROM cart_items ci
      JOIN product_variants pv ON pv.id = ci.product_variant_id
      JOIN products p ON p.id = pv.product_id
      WHERE ci.cart_id = $1
      ORDER BY ci.created_at DESC
    `, [cart.id]);

    // Calculate totals
    const items = itemsRes.rows;
    const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

    res.json({
      success: true,
      cart: {
        id: cart.id,
        items,
        subtotal,
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (err) {
    console.error('Get cart error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching cart' });
  }
};

// ═══════ ADD ITEM TO CART ═══════
exports.addToCart = async (req, res) => {
  try {
    const { userId, sessionId, variantId, quantity = 1 } = req.body;

    if (!variantId) {
      return res.status(400).json({ success: false, message: 'variantId is required' });
    }

    if (!userId && !sessionId) {
      return res.status(400).json({ success: false, message: 'userId or sessionId required' });
    }

    // Check variant exists and has stock
    const variantRes = await pool.query(
      `SELECT pv.*, p.name as product_name FROM product_variants pv
       JOIN products p ON p.id = pv.product_id
       WHERE pv.id = $1`,
      [variantId]
    );

    if (variantRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product variant not found' });
    }

    const variant = variantRes.rows[0];
    if (variant.stock_quantity < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    const cart = await getOrCreateCart(userId, sessionId);

    // Check if item already in cart
    const existingRes = await pool.query(
      `SELECT * FROM cart_items WHERE cart_id = $1 AND product_variant_id = $2`,
      [cart.id, variantId]
    );

    if (existingRes.rows.length > 0) {
      // Update quantity
      const newQty = existingRes.rows[0].quantity + quantity;
      if (newQty > variant.stock_quantity) {
        return res.status(400).json({ success: false, message: 'Not enough stock' });
      }
      await pool.query(
        `UPDATE cart_items SET quantity = $1 WHERE id = $2`,
        [newQty, existingRes.rows[0].id]
      );
    } else {
      // Insert new item
      await pool.query(
        `INSERT INTO cart_items (cart_id, product_variant_id, quantity) VALUES ($1, $2, $3)`,
        [cart.id, variantId, quantity]
      );
    }

    // Update cart timestamp
    await pool.query(`UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = $1`, [cart.id]);

    res.json({ success: true, message: 'Item added to cart' });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ success: false, message: 'Server error adding to cart' });
  }
};

// ═══════ UPDATE CART ITEM QUANTITY ═══════
exports.updateCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
    }

    // Check stock
    const itemRes = await pool.query(`
      SELECT ci.*, pv.stock_quantity 
      FROM cart_items ci 
      JOIN product_variants pv ON pv.id = ci.product_variant_id
      WHERE ci.id = $1
    `, [cartItemId]);

    if (itemRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    if (quantity > itemRes.rows[0].stock_quantity) {
      return res.status(400).json({ success: false, message: 'Not enough stock' });
    }

    await pool.query(`UPDATE cart_items SET quantity = $1 WHERE id = $2`, [quantity, cartItemId]);

    res.json({ success: true, message: 'Cart item updated' });
  } catch (err) {
    console.error('Update cart item error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ═══════ REMOVE ITEM FROM CART ═══════
exports.removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const result = await pool.query(`DELETE FROM cart_items WHERE id = $1 RETURNING *`, [cartItemId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    res.json({ success: true, message: 'Item removed from cart' });
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ═══════ CLEAR CART ═══════
exports.clearCart = async (req, res) => {
  try {
    const { userId, sessionId } = req.body;

    let cart;
    if (userId) {
      const res = await pool.query(`SELECT * FROM carts WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`, [userId]);
      cart = res.rows[0];
    } else if (sessionId) {
      const res = await pool.query(`SELECT * FROM carts WHERE session_id = $1 ORDER BY created_at DESC LIMIT 1`, [sessionId]);
      cart = res.rows[0];
    }

    if (cart) {
      await pool.query(`DELETE FROM cart_items WHERE cart_id = $1`, [cart.id]);
    }

    res.json({ success: true, message: 'Cart cleared' });
  } catch (err) {
    console.error('Clear cart error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
