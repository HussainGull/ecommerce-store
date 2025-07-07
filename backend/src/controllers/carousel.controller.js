import {Carousel} from "../models/carousel.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const createCarousel = asyncHandler(async (req, res) => {
    const {title, subtitle, link} = req.body;
    const localImagePath = req.file?.path;

    if (!localImagePath) {
        throw new ApiError(400, "Carousel image is required.");
    }

    const uploadedImage = await uploadOnCloudinary(localImagePath);

    if (!uploadedImage?.secure_url) {
        throw new ApiError(400, "Image upload failed.");
    }

    const carousel = await Carousel.create({
        imageUrl: uploadedImage.secure_url,
        title,
        subtitle,
        link,
    });

    res.status(201).json(new ApiResponse(201, carousel, "Carousel created successfully"));
});

export const updateCarousel = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {title, subtitle, link} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid carousel ID format");
    }

    const carousel = await Carousel.findById(id);

    if (!carousel) {
        throw new ApiError(404, "Carousel not found");
    }

    if (req.file?.path) {
        const uploadedImage = await uploadOnCloudinary(req.file.path);
        if (!uploadedImage?.secure_url) {
            throw new ApiError(400, "Image upload failed.");
        }
        carousel.imageUrl = uploadedImage.secure_url;
    }

    carousel.title = title || carousel.title;
    carousel.subtitle = subtitle || carousel.subtitle;
    carousel.link = link || carousel.link;

    await carousel.save();

    res.status(200).json(new ApiResponse(200, carousel, "Carousel updated successfully"));
});

export const getAllCarousels = asyncHandler(async (req, res) => {
    const carousels = await Carousel.find().sort({createdAt: -1});
    res.status(200).json(new ApiResponse(200, carousels, "Carousels fetched successfully"));
});

export const getCarouselById = asyncHandler(async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid carousel ID format");
    }

    const carousel = await Carousel.findById(id);

    if (!carousel) {
        throw new ApiError(404, "Carousel not found");
    }

    res.status(200).json(new ApiResponse(200, carousel, "Carousel fetched successfully"));
});

export const deleteCarousel = asyncHandler(async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid carousel ID format");
    }

    const carousel = await Carousel.findByIdAndDelete(id);

    if (!carousel) {
        throw new ApiError(404, "Carousel not found");
    }

    res.status(200).json(new ApiResponse(200, carousel, "Carousel deleted successfully"));
});
