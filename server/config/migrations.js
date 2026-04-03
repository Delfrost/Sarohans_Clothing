const pool = require('./db');
require('dotenv').config();

async function runMigrations() {
  try {
    console.log("Dropping all tables to align perfectly with the UUID schema...");

    // Dropping everything to ensure a clean slate for the new UUID relationships
    await pool.query(`
      DROP TABLE IF EXISTS order_items CASCADE;
      DROP TABLE IF EXISTS orders CASCADE;
      DROP TABLE IF EXISTS cart_items CASCADE;
      DROP TABLE IF EXISTS carts CASCADE;
      DROP TABLE IF EXISTS product_categories CASCADE;
      DROP TABLE IF EXISTS product_variants CASCADE;
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS categories CASCADE;
      DROP TABLE IF EXISTS addresses CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);

    console.log("Creating tables with exact ERD specifications...");

    // 1. USERS TABLE (Now uses UUID)
    await pool.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        phone TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. ADDRESSES TABLE
    await pool.query(`
      CREATE TABLE addresses (
        id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        street TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        zip_code TEXT NOT NULL,
        country TEXT DEFAULT 'India',
        is_default_shipping BOOLEAN DEFAULT false,
        is_default_billing BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. CATEGORIES TABLE (Includes parent_category_id for nesting)
    await pool.query(`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        parent_category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. PRODUCTS TABLE (Now uses UUID and includes SKU)
    await pool.query(`
      CREATE TABLE products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT,
        base_price DECIMAL NOT NULL,
        SKU_general TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. PRODUCT VARIANTS TABLE (Uses UUID, includes SKU and direct price)
    await pool.query(`
      CREATE TABLE product_variants (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        product_id UUID REFERENCES products(id) ON DELETE CASCADE,
        size TEXT,
        color TEXT,
        SKU_variant TEXT,
        price DECIMAL NOT NULL,
        stock_quantity INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 6. PRODUCT_CATEGORIES (Junction Table)
    await pool.query(`
      CREATE TABLE product_categories (
        product_id UUID REFERENCES products(id) ON DELETE CASCADE,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        PRIMARY KEY (product_id, category_id)
      );
    `);

    // 7. CARTS TABLE (Includes session_id for guest checkouts)
    await pool.query(`
      CREATE TABLE carts (
        id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        session_id TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 8. CART ITEMS TABLE
    await pool.query(`
      CREATE TABLE cart_items (
        id SERIAL PRIMARY KEY,
        cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
        product_variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
        quantity INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 9. ORDERS TABLE (Includes billing address snapshot)
    await pool.query(`
      CREATE TABLE orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        total_amount DECIMAL NOT NULL,
        status TEXT DEFAULT 'pending',
        shipping_address TEXT, 
        billing_address TEXT,
        payment_method_generic TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 10. ORDER ITEMS TABLE
    await pool.query(`
      CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
        product_variant_id UUID REFERENCES product_variants(id) ON DELETE RESTRICT,
        quantity INTEGER NOT NULL,
        unit_price DECIMAL NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Database schema perfectly aligns with the ERD!");
    process.exit();
  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  }
}

runMigrations();