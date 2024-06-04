const Kryptonian = require('../models/UserModel.js');
const fs = require('fs'); 
const path = require('path'); 

const uploadImage = async (kryptonianId, image) => {
    const imageBase64 = Buffer.from(image).toString('base64'); 
    const kryptonian = await Kryptonian.findById(kryptonianId); 
    kryptonian.images.push(imageBase64); 
    await kryptonian.save(); 
    return imageBase64; 
};

const getImage = async (id, imageId) => {
    const kryptonian = await Kryptonian.findById(id); 
    if (!kryptonian || !kryptonian.images[imageId]) {
        throw new Error('Image not found'); 
    }
    return kryptonian.images[imageId]; 
};

const getAllImages = async (id) => {
    const kryptonian = await Kryptonian.findById(id); 
    if (!kryptonian) throw new Error('Kryptonian not found'); 
    return kryptonian.images; 
};

module.exports = {
    uploadImage,
    getImage,
    getAllImages
};