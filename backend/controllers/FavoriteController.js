const Favorite = require('../models/FavoriteModel');

// Tạo lượt thích mới
exports.createFavorite = async (req, res) => {
    try {
        const { chapterId, eventId } = req.body;

        // Kiểm tra xem lượt thích đã tồn tại chưa
        const existingFavorite = await Favorite.findOne({ chapterId, eventId });
        if (existingFavorite) {
            return res.status(400).json({ message: 'Favorite already exists' });
        }

        const newFavorite = new Favorite({ chapterId, eventId });
        await newFavorite.save();
        res.status(201).json(newFavorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy tất cả lượt thích
exports.getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find();
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy lượt thích theo ID
exports.getFavoriteById = async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);
        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }
        res.status(200).json(favorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật lượt thích (chỉ cập nhật chapterId hoặc eventId)
exports.updateFavorite = async (req, res) => {
    try {
        const updatedFavorite = await Favorite.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFavorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }
        res.status(200).json(updatedFavorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa lượt thích
exports.deleteFavorite = async (req, res) => {
    try {
        const deletedFavorite = await Favorite.findByIdAndDelete(req.params.id);
        if (!deletedFavorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }
        res.status(200).json({ message: 'Favorite removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
