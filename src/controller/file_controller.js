const fileService = require('../services/file_services.js'); // Import file service

// Controller for uploading an image
const uploadImage = async (req, res) => {
    try {
        const { image } = req.body; // Extract image from request body
        const kryptonianId = req.kryptonian._id; // Get Kryptonian ID from request object
        const imageBase64 = await fileService.uploadImage(kryptonianId, image); // Upload the image
        res.status(201).json({ imageBase64 }); // Respond with the base64 image string
    } catch (error) {
        res.status(400).json({ error: error.message }); // Respond with error message
    }
};

// Controller for getting a single image
const getImage = async (req, res) => {
    try {
        const { id, imageId } = req.params; // Extract IDs from request parameters
        const image = await fileService.getImage(id, imageId); // Get the image
        res.status(200).json({ image }); // Respond with the image
    } catch (error) {
        res.status(400).json({ error: error.message }); // Respond with error message
    }
};

// Controller for getting all images of a Kryptonian
const getAllImages = async (req, res) => {
    try {
        const { id } = req.params; // Extract Kryptonian ID from request parameters
        const images = await fileService.getAllImages(id); // Get all images
        res.status(200).json({ images }); // Respond with the images
    } catch (error) {
        res.status(400).json({ error: error.message }); // Respond with error message
    }
};

module.exports = {
    uploadImage,
    getImage,
    getAllImages
};