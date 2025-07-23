const { Pool } = require('pg');
const pool = new Pool();

exports.list = async (req, res) => {
  const result = await pool.query('SELECT * FROM categories ORDER BY name');
  res.render('category_list', { categories: result.rows });
};

exports.detail = async (req, res) => {
  const id = req.params.id;
  const category = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  const items = await pool.query('SELECT * FROM items WHERE category_id = $1', [id]);
  res.render('category_detail', { category: category.rows[0], items: items.rows });
};

exports.new_get = (req, res) => {
  res.render('category_form', { category: {}, action: '/categories' });
};

exports.new_post = async (req, res) => {
  const { name, description } = req.body;
  await pool.query('INSERT INTO categories (name, description) VALUES ($1, $2)', [name, description]);
  res.redirect('/categories');
};

exports.edit_get = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  res.render('category_form', { category: result.rows[0], action: `/categories/${id}/update` });
};

exports.edit_post = async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  await pool.query('UPDATE categories SET name=$1, description=$2 WHERE id=$3', [name, description, id]);
  res.redirect(`/categories/${id}`);
};

exports.delete_post = async (req, res) => {
  const id = req.params.id;
  const { admin_password } = req.body;
  if (admin_password !== process.env.ADMIN_PASSWORD) {
    return res.send('Incorrect admin password.');
  }
  await pool.query('DELETE FROM categories WHERE id=$1', [id]);
  res.redirect('/categories');
};