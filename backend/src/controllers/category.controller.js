import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {Category} from "../models/category.model.js";


// Create Category
export const createCategory = asyncHandler(async (req, res) => {
    const {name} = req.body;

    const existing = await Category.findOne({name});
    if (existing) {
        throw new ApiError(400, "Category already exists.");
    }

    const category = await Category.create({name});
    res
        .status(201)
        .json(new ApiResponse(201, category, "Category Created"));
});

// Fetch All Categories
export const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find().select('name');
    return res.status(200).json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

// Delete Category
export const deleteCategory = asyncHandler(async (req, res) => {
    const id = req.body.id || req.query.id;

    if (!id) {
        throw new ApiError(400, "Category ID is required");
    }

    const deletedCategory = await Category.findByIdAndDelete(id.toString());

    if (!deletedCategory) {
        throw new ApiError(404, "Category not found");
    }

    res.status(200).json(new ApiResponse(200, id, "Category deleted successfully"));
});

// Fetch Category
export const getCategoryById = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const category = await Category.findById(id);

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    res.status(200).json(new ApiResponse(200, category, "Category fetched successfully"));
});

// Update Category
export const updateCategory = asyncHandler(async (req, res) => {
    const {id, name} = req.body;

    if (!id) throw new ApiError(400, "Category id is required.");
    if (!name || name.trim() === "") throw new ApiError(400, "Category name is required.");

    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        {name: name.trim()},
        {new: true, runValidators: true}
    );

    if (!updatedCategory) throw new ApiError(404, "Category not found.");

    res.status(200).json(new ApiResponse(200, updatedCategory, "Category updated successfully!"));
});