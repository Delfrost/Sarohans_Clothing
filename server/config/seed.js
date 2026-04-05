const pool = require('./db');
require('dotenv').config();

async function seed() {
  try {
    console.log("🌱 Seeding categories...");

    // ═══════ ROOT CATEGORIES ═══════
    const saroRes = await pool.query(
      `INSERT INTO categories (name, slug, gender, description) 
       VALUES ('Saro', 'saro', 'women', 'Women''s ethnic wear collection — Grace woven into every thread')
       RETURNING id`
    );
    const saroId = saroRes.rows[0].id;

    const hansRes = await pool.query(
      `INSERT INTO categories (name, slug, gender, description)
       VALUES ('Hans', 'hans', 'men', 'Men''s ethnic wear collection — Commanding presence, refined tradition')
       RETURNING id`
    );
    const hansId = hansRes.rows[0].id;

    // ═══════ WOMEN'S MAIN CATEGORIES ═══════
    const womenMain = [
      { name: 'Saree', slug: 'saree', desc: 'Timeless drapes that define elegance' },
      { name: 'Poshak', slug: 'poshak', desc: 'Traditional Rajasthani ensembles of royal grandeur' },
      { name: 'Lehengas', slug: 'lehengas', desc: 'Bridal and festive lehengas with exquisite craftsmanship' },
      { name: 'Rajputi Saree', slug: 'rajputi-saree', desc: 'The crown jewel of Rajasthani heritage — our signature collection' },
    ];

    const womenCatIds = {};
    for (const cat of womenMain) {
      const res = await pool.query(
        `INSERT INTO categories (name, slug, gender, description, parent_category_id)
         VALUES ($1, $2, 'women', $3, $4) RETURNING id`,
        [cat.name, cat.slug, cat.desc, saroId]
      );
      womenCatIds[cat.slug] = res.rows[0].id;
    }

    // ═══════ WOMEN'S SUBCATEGORIES (Fabric/Style Filters) ═══════
    const womenSubs = [
      { name: 'Bandhani', slug: 'bandhani' },
      { name: 'Banarsi', slug: 'banarsi' },
      { name: 'Silk', slug: 'silk' },
      { name: 'Dola Silk', slug: 'dola-silk' },
      { name: 'Georgette', slug: 'georgette' },
      { name: 'Chiffon', slug: 'chiffon' },
      { name: 'Leheriya', slug: 'leheriya' },
      { name: 'Chunariya', slug: 'chunariya' },
      { name: 'Kanjeevaram', slug: 'kanjeevaram' },
      { name: 'Net', slug: 'net' },
      { name: 'Paithani', slug: 'paithani' },
      { name: 'Kota Doria', slug: 'kota-doria' },
      { name: 'Patola Saree', slug: 'patola-saree' },
      { name: 'Lucknavi', slug: 'lucknavi' },
      { name: 'Synthetic Saree', slug: 'synthetic-saree' },
      { name: 'Blouse - Printed', slug: 'blouse-printed' },
      { name: 'Blouse - Plain', slug: 'blouse-plain' },
    ];

    const womenSubIds = {};
    for (const sub of womenSubs) {
      const res = await pool.query(
        `INSERT INTO categories (name, slug, gender, description, parent_category_id)
         VALUES ($1, $2, 'women', $3, $4) RETURNING id`,
        [sub.name, sub.slug, `${sub.name} fabric/style type`, saroId]
      );
      womenSubIds[sub.slug] = res.rows[0].id;
    }

    // ═══════ MEN'S MAIN CATEGORIES ═══════
    const menMain = [
      { name: 'Kurta', slug: 'kurta', desc: 'Classic and contemporary kurtas for the modern man' },
      { name: 'Shirts', slug: 'shirts', desc: 'Ethnic and casual shirts with traditional prints' },
    ];

    const menCatIds = {};
    for (const cat of menMain) {
      const res = await pool.query(
        `INSERT INTO categories (name, slug, gender, description, parent_category_id)
         VALUES ($1, $2, 'men', $3, $4) RETURNING id`,
        [cat.name, cat.slug, cat.desc, hansId]
      );
      menCatIds[cat.slug] = res.rows[0].id;
    }

    // ═══════ MEN'S SUBCATEGORIES ═══════
    const menSubs = [
      { name: 'Printed Shirts', slug: 'printed-shirts' },
      { name: 'Jaipuri Shirts', slug: 'jaipuri-shirts' },
      { name: 'Ethnic Shirts', slug: 'ethnic-shirts' },
      { name: 'Koti', slug: 'koti' },
      { name: 'Bottom Wear', slug: 'bottom-wear' },
    ];

    const menSubIds = {};
    for (const sub of menSubs) {
      const res = await pool.query(
        `INSERT INTO categories (name, slug, gender, description, parent_category_id)
         VALUES ($1, $2, 'men', $3, $4) RETURNING id`,
        [sub.name, sub.slug, `${sub.name} style category`, hansId]
      );
      menSubIds[sub.slug] = res.rows[0].id;
    }

    console.log("✅ Categories seeded!");

    // ═══════ DEMO PRODUCTS — WOMEN'S ═══════
    console.log("🌱 Seeding demo products...");

    const womenProducts = [
      {
        name: 'Royal Bandhani Silk Saree',
        desc: 'Exquisite hand-tied bandhani work on pure silk, featuring intricate patterns passed down through generations. Perfect for weddings and festive occasions.',
        price: 12500,
        sku: 'SAR-BND-001',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=85',
        categories: [womenCatIds['saree'], womenSubIds['bandhani'], womenSubIds['silk']],
        variants: [
          { size: 'Free Size', color: 'Maroon & Gold', price: 12500, stock: 10 },
          { size: 'Free Size', color: 'Red & Gold', price: 12500, stock: 8 },
        ],
      },
      {
        name: 'Banarsi Georgette Saree',
        desc: 'Luxurious Banarsi weave on premium georgette fabric. Traditional motifs with a contemporary drape that moves with effortless grace.',
        price: 18500,
        sku: 'SAR-BNR-002',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=85',
        categories: [womenCatIds['saree'], womenSubIds['banarsi'], womenSubIds['georgette']],
        variants: [
          { size: 'Free Size', color: 'Pink & Gold', price: 18500, stock: 6 },
          { size: 'Free Size', color: 'Green & Gold', price: 18500, stock: 5 },
        ],
      },
      {
        name: 'Rajputi Poshak - Heritage Collection',
        desc: 'A statement piece from our heritage collection. Rich zardozi embroidery on premium fabric, this poshak is the epitome of Rajasthani royalty.',
        price: 28000,
        sku: 'SAR-PSH-001',
        image: 'https://i.pinimg.com/736x/59/af/32/59af328e444197968994c7b240b5b389.jpg',
        categories: [womenCatIds['poshak']],
        variants: [
          { size: 'S', color: 'Royal Red', price: 28000, stock: 3 },
          { size: 'M', color: 'Royal Red', price: 28000, stock: 5 },
          { size: 'L', color: 'Royal Red', price: 28000, stock: 4 },
        ],
      },
      {
        name: 'Leheriya Chiffon Saree',
        desc: 'Vibrant leheriya waves of color on flowing chiffon. A celebration of Rajasthani tie-dye artistry perfect for festive gatherings.',
        price: 5500,
        sku: 'SAR-LHR-001',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=85',
        categories: [womenCatIds['saree'], womenSubIds['leheriya'], womenSubIds['chiffon']],
        variants: [
          { size: 'Free Size', color: 'Multi Pink', price: 5500, stock: 15 },
          { size: 'Free Size', color: 'Multi Green', price: 5500, stock: 12 },
        ],
      },
      {
        name: 'Bridal Lehenga - Regal Rose',
        desc: 'Hand-embroidered bridal lehenga in deep rose with intricate gold thread work. Comes with matching dupatta and blouse piece.',
        price: 29500,
        sku: 'SAR-LHG-001',
        image: 'https://i.pinimg.com/736x/40/e6/1b/40e61bc7d56a9db626ec3f54fb38d768.jpg',
        categories: [womenCatIds['lehengas']],
        variants: [
          { size: 'S', color: 'Rose Pink', price: 29500, stock: 2 },
          { size: 'M', color: 'Rose Pink', price: 29500, stock: 3 },
          { size: 'L', color: 'Rose Pink', price: 29500, stock: 2 },
        ],
      },
      {
        name: 'Rajputi Saree - Kundan Heritage',
        desc: 'Our signature Rajputi saree with kundan work and gota patti detailing. A masterpiece that embodies the spirit of royal Rajasthan.',
        price: 22000,
        sku: 'SAR-RAJ-001',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=85',
        categories: [womenCatIds['rajputi-saree'], womenSubIds['silk']],
        variants: [
          { size: 'Free Size', color: 'Royal Blue & Gold', price: 22000, stock: 4 },
          { size: 'Free Size', color: 'Emerald & Gold', price: 22000, stock: 3 },
        ],
      },
    ];

    // ═══════ DEMO PRODUCTS — MEN'S ═══════
    const menProducts = [
      {
        name: 'Classic Jaipuri Print Kurta',
        desc: 'Hand block-printed Jaipuri kurta in premium cotton. Traditional motifs meet contemporary fit for the modern gentleman.',
        price: 3500,
        sku: 'HAN-KRT-001',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=85',
        categories: [menCatIds['kurta'], menSubIds['jaipuri-shirts']],
        variants: [
          { size: 'S', color: 'Blue', price: 3500, stock: 10 },
          { size: 'M', color: 'Blue', price: 3500, stock: 12 },
          { size: 'L', color: 'Blue', price: 3500, stock: 8 },
          { size: 'XL', color: 'Blue', price: 3500, stock: 6 },
        ],
      },
      {
        name: 'Silk Ethnic Kurta - Maharaja',
        desc: 'Premium silk kurta with subtle zari embroidery. Perfect for weddings, festivals, and grand celebrations.',
        price: 8500,
        sku: 'HAN-KRT-002',
        image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=85',
        categories: [menCatIds['kurta'], menSubIds['ethnic-shirts']],
        variants: [
          { size: 'M', color: 'Ivory', price: 8500, stock: 5 },
          { size: 'L', color: 'Ivory', price: 8500, stock: 5 },
          { size: 'XL', color: 'Ivory', price: 8500, stock: 4 },
        ],
      },
      {
        name: 'Printed Cotton Shirt - Rajwada',
        desc: 'Block-printed cotton shirt with traditional Rajasthani motifs. Comfortable, stylish, and perfect for casual ethnic wear.',
        price: 2200,
        sku: 'HAN-SHT-001',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=85',
        categories: [menCatIds['shirts'], menSubIds['printed-shirts']],
        variants: [
          { size: 'S', color: 'White & Blue', price: 2200, stock: 15 },
          { size: 'M', color: 'White & Blue', price: 2200, stock: 18 },
          { size: 'L', color: 'White & Blue', price: 2200, stock: 12 },
          { size: 'XL', color: 'White & Blue', price: 2200, stock: 8 },
        ],
      },
      {
        name: 'Ethnic Nehru Koti - Royal Gold',
        desc: 'Handcrafted Nehru jacket with intricate brocade work. A versatile layering piece that elevates any ethnic ensemble.',
        price: 6500,
        sku: 'HAN-KOT-001',
        image: 'https://i.pinimg.com/736x/ae/7b/3a/ae7b3aa67838af01ed6d25c3c90e2d4d.jpg',
        categories: [menSubIds['koti']],
        variants: [
          { size: 'S', color: 'Gold & Maroon', price: 6500, stock: 6 },
          { size: 'M', color: 'Gold & Maroon', price: 6500, stock: 8 },
          { size: 'L', color: 'Gold & Maroon', price: 6500, stock: 6 },
          { size: 'XL', color: 'Gold & Maroon', price: 6500, stock: 4 },
        ],
      },
      {
        name: 'Jaipuri Mandarin Collar Shirt',
        desc: 'Elegant mandarin collar shirt with hand block-printed Jaipuri patterns. Perfect blend of tradition and modern fashion.',
        price: 2800,
        sku: 'HAN-SHT-002',
        image: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=85',
        categories: [menCatIds['shirts'], menSubIds['jaipuri-shirts']],
        variants: [
          { size: 'M', color: 'Mustard', price: 2800, stock: 10 },
          { size: 'L', color: 'Mustard', price: 2800, stock: 10 },
          { size: 'XL', color: 'Mustard', price: 2800, stock: 7 },
        ],
      },
      {
        name: 'Cotton Lungi - Traditional Comfort',
        desc: 'Premium handloom cotton lungi with traditional check pattern. Breathable and comfortable for daily and festive wear.',
        price: 1200,
        sku: 'HAN-BTM-001',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=85',
        categories: [menSubIds['bottom-wear']],
        variants: [
          { size: 'Free Size', color: 'White & Gold Check', price: 1200, stock: 20 },
          { size: 'Free Size', color: 'Maroon Check', price: 1200, stock: 15 },
        ],
      },
    ];

    // Insert all products
    const allProducts = [...womenProducts, ...menProducts];

    for (const prod of allProducts) {
      // Insert product
      const prodRes = await pool.query(
        `INSERT INTO products (name, description, base_price, SKU_general, image_url)
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [prod.name, prod.desc, prod.price, prod.sku, prod.image]
      );
      const productId = prodRes.rows[0].id;

      // Insert product-category assignments
      for (const catId of prod.categories) {
        await pool.query(
          `INSERT INTO product_categories (product_id, category_id) VALUES ($1, $2)`,
          [productId, catId]
        );
      }

      // Insert variants
      for (const v of prod.variants) {
        await pool.query(
          `INSERT INTO product_variants (product_id, size, color, price, stock_quantity, SKU_variant)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [productId, v.size, v.color, v.price, v.stock, `${prod.sku}-${v.size}-${v.color.replace(/\s/g, '')}`]
        );
      }
    }

    console.log(`✅ Seeded ${allProducts.length} demo products with variants!`);
    console.log("🎉 Database seeding complete!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
