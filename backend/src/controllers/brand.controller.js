import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {Brand} from "../models/brand.model.js";


// Create Brand
export const createBrand = asyncHandler(async (req, res) => {
    const {name} = req.body;

    const existing = await Brand.findOne({name});
    if (existing) {
        throw new ApiError(400, "Brand already exists.");
    }

    const brand = await Brand.create({name});
    res.status(201).json(new ApiResponse(201, brand, "Brand Created"));
});

// Fetch All Brands
export const getAllBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find().select('name');
    res.status(200).json(new ApiResponse(200, brands, "All Brands Fetched"));
});

// Brand Category
export const deleteBrand = asyncHandler(async (req, res) => {
    const id = req.body.id || req.query.id;

    if (!id) {
        throw new ApiError(400, "Brand ID is required");
    }

    const deletedBrand = await Brand.findByIdAndDelete(id.toString());

    if (!deletedBrand) {
        throw new ApiError(404, "Brand not found");
    }

    res.status(200).json(new ApiResponse(200, id, "Brand deleted successfully"));
});

// Update Brand
export const updateBrand = asyncHandler(async (req, res) => {
    const {id, name} = req.body;

    if (!id) throw new ApiError(400, "Brand id is required.");
    if (!name || name.trim() === "") throw new ApiError(400, "Brand name is required.");

    const updatedBrand = await Brand.findByIdAndUpdate(
        id,
        {name: name.trim()},
        {new: true, runValidators: true}
    );

    if (!updatedBrand) throw new ApiError(404, "Brand not found.");

    res.status(200).json(new ApiResponse(200, updatedBrand, "Brand updated successfully!"));
});


// Fetch Brand
export const getBrandById = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const brand = await Brand.findById(id);

    if (!brand) {
        throw new ApiError(404, "Brand not found");
    }

    res.status(200).json(new ApiResponse(200, brand, "Brand fetched successfully"));
});


