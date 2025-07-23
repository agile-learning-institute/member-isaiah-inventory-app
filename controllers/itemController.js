const { Pool: ItemPool } = require('pg');
const itemPool = new ItemPool();

exports.list = async (req, res) => {
  const result = await itemPool.query('SELECT items.*, categories.name AS category_name FROM items JOIN categories ON items.category_id = categories.id ORDER BY items.name');
  res.render('item_list', { items: result.rows });
};

exports.detail = async (req, res) => {
  const id = req.params.id;
  const result = await itemPool.query('SELECT * FROM items WHERE id = $1', [id]);
  res.render('item_detail', { item: result.rows[0] });
};

exports.new_get = async (req, res) => {
  const categories = await itemPool.query('SELECT * FROM categories ORDER BY name');
  res.render('item_form', { item: {}, categories: categories.rows, action: '/items' });
};

exports.new_post = async (req, res) => {
  const { name, description, price, stock_quantity, category_id } = req.body;
  await itemPool.query(
    'INSERT INTO items (name, description, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4, $5)',
    [name, description, price, stock_quantity, category_id]
  );
  res.redirect('/items');
};

exports.edit_get = async (req, res) => {
  const id = req.params.id;
  const item = await itemPool.query('SELECT * FROM items WHERE id = $1', [id]);
  const categories = await itemPool.query('SELECT * FROM categories ORDER BY name');
  res.render('item_form', { item: item.rows[0], categories: categories.rows, action: `/items/${id}/update` });
};

exports.edit_post = async (req, res) => {
  const id = req.params.id;
  const { name, description, price, stock_quantity, category_id } = req.body;
  await itemPool.query(
    'UPDATE items SET name=$1, description=$2, price=$3, stock_quantity=$4, category_id=$5 WHERE id=$6',
    [name, description, price, stock_quantity, category_id, id]
  );
  res.redirect(`/items/${id}`);
};

exports.delete_post = async (req, res) => {
  const id = req.params.id;
  const { admin_password } = req.body;
  if (admin_password !== process.env.ADMIN_PASSWORD) {
    return res.send('Incorrect admin password.');
  }
  await itemPool.query('DELETE FROM items WHERE id=$1', [id]);
  res.redirect('/items');
};
