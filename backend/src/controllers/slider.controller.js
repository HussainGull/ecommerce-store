import {asyncHandler} from "../utils/asyncHandler.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import Slider from "../models/slider.model.js";


export const createSlider = asyncHandler(async (req, res) => {
    const {heading, paragraph, ctaText, ctaLink} = req.body;

    // ✅ Field validation remains the same
    const fields = {heading, paragraph, ctaText, ctaLink};
    const missingFields = Object.entries(fields).reduce((acc, [key, value]) => {
        if (!value || value.trim() === "") acc.push(key);
        return acc;
    }, []);

    if (missingFields.length > 0) {
        throw new ApiError(400, `Missing required fields: ${missingFields.join(", ")}`);
    }

    // ✅ Change to single file handling
    const imagePath = req.file?.path;
    if (!imagePath) {
        throw new ApiError(400, "Slider image is required.");
    }

    // ✅ Upload single image
    const uploadResult = await uploadOnCloudinary(imagePath);
    if (!uploadResult?.secure_url) {
        throw new ApiError(400, "Image upload failed.");
    }

    // ✅ Save with single image field
    const slider = await Slider.create({
        ...fields,
        sliderImage: uploadResult.secure_url, // Changed from images array to single image
    });

    return res.status(201).json(new ApiResponse(201, slider, "Slider Created Successfully!"));
});


export const fetchSliders = asyncHandler(async (req, res) => {
    const sliders = await Slider.find({});
    res
        .status(200)
        .json(new ApiResponse(201, sliders, "Sliders fetched successfully!"));
});


export const deleteSlider = asyncHandler(async (req, res) => {
    const {id} = req.params;

    if (!id) {
        res.status(400);
        throw new Error('Slider ID is required');
    }

    const slider = await Slider.findByIdAndDelete(id);

    if (!slider) {
        res.status(404);
        throw new Error('Slider not found');
    }

    res.status(200).json(new ApiResponse(200, {id: slider._id}, "Slider deleted successfully!"));
});


export const getSingleSlider = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const slider = await Slider.findById(id);

    if (!slider) {
        res.status(404);
        throw new Error('Slider not found');
    }

    res.status(200).json(new ApiResponse(200, slider, "Slider fetched successfully"));
});


export const updateSlider = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const slider = await Slider.findById(id);
    if (!slider) {
        res.status(404);
        throw new Error('Slider not found');
    }

    const allowedFields = ['heading', 'paragraph', 'ctaText', 'ctaLink'];

    // ✅ Update text fields
    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            slider[field] = req.body[field];
        }
    });

    // ✅ Handle image upload
    if (req.file) {
        const uploadResult = await uploadOnCloudinary(req.file.path);

        if (!uploadResult?.secure_url) {
            throw new ApiError(400, "Image upload failed.");
        }

        slider.sliderImage = uploadResult.secure_url;
    }

    const updatedSlider = await slider.save();

    res.status(200).json(new ApiResponse(200, updatedSlider, "Slider updated successfully!"));
});