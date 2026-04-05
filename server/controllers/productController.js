const pool = require('../config/db');

// ═══════ GET ALL CATEGORIES (hierarchical) ═══════
exports.getCategories = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, p.name as parent_name, p.slug as parent_slug
      FROM categories c
      LEFT JOIN categories p ON c.parent_category_id = p.id
      ORDER BY c.parent_category_id NULLS FIRST, c.id
    `);
    res.json({ success: true, categories: result.rows });
  } catch (err) {
    console.error('Get categories error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching categories' });
  }
};

// ═══════ GET CATEGORIES BY GENDER ═══════
exports.getCategoriesByGender = async (req, res) => {
  try {
    const { gender } = req.params;
    if (!['women', 'men', 'unisex'].includes(gender)) {
      return res.status(400).json({ success: false, message: 'Invalid gender parameter' });
    }

    // Get root category (Saro or Hans)
    const rootRes = await pool.query(
      `SELECT * FROM categories WHERE gender = $1 AND parent_category_id IS NULL`,
      [gender]
    );

    // Get all children of root
    const childrenRes = await pool.query(
      `SELECT * FROM categories WHERE gender = $1 AND parent_category_id = $2 ORDER BY id`,
      [gender, rootRes.rows[0]?.id]
    );

    // Separate main categories vs subcategories/filters
    const mainSlugs = ['saree', 'poshak', 'lehengas', 'rajputi-saree', 'kurta', 'shirts'];
    const mainCategories = [];
    const subcategories = [];

    for (const cat of childrenRes.rows) {
      if (mainSlugs.includes(cat.slug)) {
        mainCategories.push(cat);
      } else {
        subcategories.push(cat);
      }
    }

    res.json({
      success: true,
      root: rootRes.rows[0] || null,
      mainCategories,
      subcategories,
    });
  } catch (err) {
    console.error('Get categories by gender error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ═══════ GET ALL PRODUCTS (with filters) ═══════
exports.getProducts = async (req, res) => {
  try {
    const { category, gender, subcategory, minPrice, maxPrice, sort, search, page = 1, limit = 20 } = req.query;

    // Build base query - simpler approach with subqueries for variants/categories
    let baseQuery = `
      SELECT p.*
      FROM products p
    `;

    const conditions = ['p.is_active = true'];
    const params = [];
    let paramIdx = 1;

    // Filter by gender
    if (gender) {
      conditions.push(`EXISTS (
        SELECT 1 FROM product_categories pc2
        JOIN categories c2 ON c2.id = pc2.category_id
        WHERE pc2.product_id = p.id AND c2.gender = $${paramIdx}
      )`);
      params.push(gender);
      paramIdx++;
    }

    // Filter by category slug
    if (category) {
      conditions.push(`EXISTS (
        SELECT 1 FROM product_categories pc3
        JOIN categories c3 ON c3.id = pc3.category_id
        WHERE pc3.product_id = p.id AND c3.slug = $${paramIdx}
      )`);
      params.push(category);
      paramIdx++;
    }

    // Filter by subcategory slug
    if (subcategory) {
      conditions.push(`EXISTS (
        SELECT 1 FROM product_categories pc4
        JOIN categories c4 ON c4.id = pc4.category_id
        WHERE pc4.product_id = p.id AND c4.slug = $${paramIdx}
      )`);
      params.push(subcategory);
      paramIdx++;
    }

    // Filter by price range
    if (minPrice) {
      conditions.push(`p.base_price >= $${paramIdx}`);
      params.push(minPrice);
      paramIdx++;
    }
    if (maxPrice) {
      conditions.push(`p.base_price <= $${paramIdx}`);
      params.push(maxPrice);
      paramIdx++;
    }

    // Search by name
    if (search) {
      conditions.push(`p.name ILIKE $${paramIdx}`);
      params.push(`%${search}%`);
      paramIdx++;
    }

    if (conditions.length > 0) {
      baseQuery += ` WHERE ${conditions.join(' AND ')}`;
    }

    // Sorting
    switch (sort) {
      case 'price_asc':
        baseQuery += ` ORDER BY p.base_price ASC`;
        break;
      case 'price_desc':
        baseQuery += ` ORDER BY p.base_price DESC`;
        break;
      case 'newest':
        baseQuery += ` ORDER BY p.created_at DESC`;
        break;
      case 'name_asc':
        baseQuery += ` ORDER BY p.name ASC`;
        break;
      default:
        baseQuery += ` ORDER BY p.created_at DESC`;
    }

    // Pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    baseQuery += ` LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`;
    params.push(parseInt(limit), offset);

    const result = await pool.query(baseQuery, params);

    // Now fetch variants and categories for each product
    const products = [];
    for (const prod of result.rows) {
      const variantsRes = await pool.query(
        `SELECT id, size, color, price, stock_quantity FROM product_variants WHERE product_id = $1`,
        [prod.id]
      );
      const categoriesRes = await pool.query(
        `SELECT c.id, c.name, c.slug, c.gender FROM categories c
         JOIN product_categories pc ON pc.category_id = c.id
         WHERE pc.product_id = $1`,
        [prod.id]
      );
      products.push({
        ...prod,
        variants: variantsRes.rows,
        categories: categoriesRes.rows,
      });
    }

    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) FROM products p`;
    const countConditions = ['p.is_active = true'];
    const countParams = [];
    let countIdx = 1;

    if (gender) {
      countConditions.push(`EXISTS (
        SELECT 1 FROM product_categories pc2
        JOIN categories c2 ON c2.id = pc2.category_id
        WHERE pc2.product_id = p.id AND c2.gender = $${countIdx}
      )`);
      countParams.push(gender);
      countIdx++;
    }
    if (category) {
      countConditions.push(`EXISTS (
        SELECT 1 FROM product_categories pc3
        JOIN categories c3 ON c3.id = pc3.category_id
        WHERE pc3.product_id = p.id AND c3.slug = $${countIdx}
      )`);
      countParams.push(category);
      countIdx++;
    }
    if (subcategory) {
      countConditions.push(`EXISTS (
        SELECT 1 FROM product_categories pc4
        JOIN categories c4 ON c4.id = pc4.category_id
        WHERE pc4.product_id = p.id AND c4.slug = $${countIdx}
      )`);
      countParams.push(subcategory);
      countIdx++;
    }
    if (minPrice) {
      countConditions.push(`p.base_price >= $${countIdx}`);
      countParams.push(minPrice);
      countIdx++;
    }
    if (maxPrice) {
      countConditions.push(`p.base_price <= $${countIdx}`);
      countParams.push(maxPrice);
      countIdx++;
    }
    if (search) {
      countConditions.push(`p.name ILIKE $${countIdx}`);
      countParams.push(`%${search}%`);
      countIdx++;
    }

    if (countConditions.length > 0) {
      countQuery += ` WHERE ${countConditions.join(' AND ')}`;
    }

    const countResult = await pool.query(countQuery, countParams);
    const totalProducts = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalProducts,
        totalPages: Math.ceil(totalProducts / parseInt(limit)),
      },
    });
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching products' });
  }
};

// ═══════ GET SINGLE PRODUCT ═══════
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const productRes = await pool.query(
      `SELECT p.* FROM products p WHERE p.id = $1 AND p.is_active = true`,
      [id]
    );

    if (productRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const product = productRes.rows[0];

    // Get variants
    const variantsRes = await pool.query(
      `SELECT * FROM product_variants WHERE product_id = $1 ORDER BY size, color`,
      [id]
    );

    // Get categories
    const categoriesRes = await pool.query(
      `SELECT c.* FROM categories c
       JOIN product_categories pc ON pc.category_id = c.id
       WHERE pc.product_id = $1`,
      [id]
    );

    res.json({
      success: true,
      product: {
        ...product,
        variants: variantsRes.rows,
        categories: categoriesRes.rows,
      },
    });
  } catch (err) {
    console.error('Get product error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
