// Mongoose Model for Carousel
import mongoose from 'mongoose';

const carouselSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    subtitle: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    }
}, {timestamps: true});

export const Carousel = mongoose.model('Carousel', carouselSchema);