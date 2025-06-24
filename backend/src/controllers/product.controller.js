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

    // Step 1: Required + type-normalized fields
    const fields = {
        productName,
        description,
        category,
        brand,
        sku,
        stockQuantity: Number(stockQuantity),
        regularPrice: Number(regularPrice),
        salePrice: Number(salePrice),
        tags,
    };

    const missingOrInvalid = Object.entries(fields).reduce((acc, [key, value]) => {
        if (
            value === undefined ||
            value === null ||
            (typeof value === "string" && value.trim() === "") ||
            (Array.isArray(value) && value.length === 0) ||
            (["stockQuantity", "regularPrice", "salePrice"].includes(key) && isNaN(value))
        ) {
            acc.push(key);
        }
        return acc;
    }, []);

    if (missingOrInvalid.length > 0) {
        throw new ApiError(400, `Invalid or missing fields: ${missingOrInvalid.join(", ")}`);
    }

    // Step 2: Image upload
    const imagePaths = (req.files?.productImage || []).map(file => file?.path).filter(Boolean);

    if (!imagePaths.length) {
        throw new ApiError(408, "Product images are required.");
    }

    const uploadedUrls = await Promise.all(
        imagePaths.map(async (path) => {
            const result = await uploadOnCloudinary(path);
            return result?.secure_url || null;
        })
    );

    const productImage = uploadedUrls.filter(Boolean);

    if (!productImage.length) {
        throw new ApiError(400, "Image upload failed.");
    }

    // Step 3: Create product
    const product = await Product.create({...fields, productImage});

    // Step 4: Response
    return res.status(201).json(
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