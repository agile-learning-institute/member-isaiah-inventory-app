-- Drop existing tables if they exist (for dev/testing)
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS categories;

-- Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT
);

-- Create items table
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  quantity INTEGER NOT NULL CHECK (quantity >= 0),
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

-- Optional index to improve category lookup performance
CREATE INDEX idx_items_category_id ON items(category_id);