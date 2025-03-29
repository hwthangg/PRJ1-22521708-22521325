const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/FavoriteController.js');

router.post('/', favoriteController.createFavorite);
router.get('/', favoriteController.getFavorites);
router.get('/:id', favoriteController.getFavoriteById);
router.put('/:id', favoriteController.updateFavorite);
router.delete('/:id', favoriteController.deleteFavorite);

module.exports = router;
