const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.list);
router.get('/new', categoryController.new_get);
router.post('/', categoryController.new_post);
router.get('/:id', categoryController.detail);
router.get('/:id/edit', categoryController.edit_get);
router.post('/:id/update', categoryController.edit_post);
router.post('/:id/delete', categoryController.delete_post);

module.exports = router;
