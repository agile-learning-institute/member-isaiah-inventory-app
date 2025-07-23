const express = require('express');
const itemRouter = express.Router();
const itemController = require('../controllers/itemController');

itemRouter.get('/', itemController.list);
itemRouter.get('/new', itemController.new_get);
itemRouter.post('/', itemController.new_post);
itemRouter.get('/:id', itemController.detail);
itemRouter.get('/:id/edit', itemController.edit_get);
itemRouter.post('/:id/update', itemController.edit_post);
itemRouter.post('/:id/delete', itemController.delete_post);

module.exports = itemRouter;
