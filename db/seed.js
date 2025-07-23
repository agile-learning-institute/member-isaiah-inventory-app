const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const seed = async () => {
  try {
    await pool.query('DELETE FROM items');
    await pool.query('DELETE FROM categories');

    const categories = [
      { name: 'Electronics', description: 'Gadgets and devices' },
      { name: 'Books', description: 'Printed and digital books' },
      { name: 'Clothing', description: 'Apparel for all ages' }
    ];

    const insertedCategories = await Promise.all(
      categories.map(c =>
        pool.query(
          'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
          [c.name, c.description]
        )
      )
    );

    const categoryIds = insertedCategories.map(r => r.rows[0].id);

    const items = [
      { name: 'Smartphone', description: 'Latest model', price: 799.99, quantity: 25, category_id: categoryIds[0] },
      { name: 'Laptop', description: 'Lightweight and fast', price: 1299.49, quantity: 15, category_id: categoryIds[0] },
      { name: 'Novel', description: 'Best-seller fiction', price: 14.99, quantity: 100, category_id: categoryIds[1] },
      { name: 'T-Shirt', description: '100% cotton', price: 19.99, quantity: 50, category_id: categoryIds[2] }
    ];

    await Promise.all(
      items.map(i =>
        pool.query(
          'INSERT INTO items (name, description, price, quantity, category_id) VALUES ($1, $2, $3, $4, $5)',
          [i.name, i.description, i.price, i.quantity, i.category_id]
        )
      )
    );

    console.log('✅ Seed data inserted successfully.');
    await pool.end();
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    await pool.end();
  }
};

seed();
