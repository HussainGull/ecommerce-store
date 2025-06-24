import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {Product} from "../models/product.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"; // Adjust as needed


// Add Product
export const addProduct = asyncHandler(async (req, res) => {
    const {
        productName,
        description,
        category,
        brand,
        sku,
        stockQuantity,
        regularPrice,
        salePrice,
        tags,
    } = req.body;

    // Step 1: Field validation
    const requiredFields = {
        productName,
        description,
        category,
        brand,
        sku,
        stockQuantity,
        regularPrice,
        salePrice,
        tags,
    };

    // Check for missing fields
    const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) =>
            value === undefined ||
            value === null ||
            (typeof value === "string" && value.trim() === "") ||
            (Array.isArray(value) && value.length === 0)
        ).map(([key]) => key);

    if (missingFields.length > 0) {
        throw new ApiError(400, `Missing required fields: ${missingFields.join(", ")}`);
    }

    // Step 2: Ensure numeric fields are actually numbers
    const numberFields = ["stockQuantity", "regularPrice", "salePrice"];
    const invalidNumberFields = numberFields.filter(
        (field) => isNaN(Number(requiredFields[field]))
    );

    if (invalidNumberFields.length > 0) {
        throw new ApiError(400, `Invalid number fields: ${invalidNumberFields.join(", ")}`);
    }

    // Step 3: Normalize number fields
    const normalizedFields = {
        ...requiredFields,
        stockQuantity: Number(stockQuantity),
        regularPrice: Number(regularPrice),
        salePrice: Number(salePrice),
    };

    // Step 4: Handle image upload
    const productImagePaths = Array.isArray(req.files?.productImage) ? req.files.productImage.filter(file => file?.path).map(file => file.path) : [];

    if (productImagePaths.length === 0) {
        throw new ApiError(408, "Product images are required")
    }

    const uploadedProductImages = await Promise.all(
        productImagePaths.map(async (localPath) => {
            const result = await uploadOnCloudinary(localPath);
            return result?.secure_url || null;
        })
    );

    const validImageUrls = uploadedProductImages.filter(Boolean);

    if (validImageUrls.length === 0) {
        throw new ApiError(400, "Cloud upload failed for all images.");
    }

    // Step 5: Create product
    const product = await Product.create({
        ...normalizedFields,
        productImage: validImageUrls,
    });

    // Step 6: Return response
    return res
        .status(201)
        .json(
            new ApiResponse(201, product, "Product Created Successfully!")
        );
});

// Get All Products
export const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const allProducts = await Product.find().sort({createdAt: -1});

        return res.status(200).json(
            new ApiResponse(200, allProducts, "Products fetched successfully!")
        );
    } catch (e) {
        throw new ApiError(500, `Failed to fetch products: ${e.message}`);
    }
});

// Delete Products
export const deleteProducts = asyncHandler(async (req, res) => {
    const {id} = req.params;

    if (!id) {
        throw new ApiError(401, "Product Id Is Required to Delete")
    }

    const deleteProduct = await Product.findByIdAndDelete(id.toString())

    if (!deleteProduct) {
        throw new ApiError(401, "Error While Deleting the Product")
    }

    res.status(200).json(new ApiResponse(200, deleteProduct));
})