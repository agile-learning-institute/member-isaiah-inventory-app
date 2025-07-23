require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const categoryRoutes = require('./routes/categories');
const itemRoutes = require('./routes/items');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.redirect('/categories'));
app.use('/categories', categoryRoutes);
app.use('/items', itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
