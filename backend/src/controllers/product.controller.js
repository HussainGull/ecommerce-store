import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {Product} from "../models/product.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {Category} from "../models/category.model.js";
import {Brand} from "../models/brand.model.js";
import mongoose from "mongoose"; // Adjust as needed


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

    if (!mongoose.Types.ObjectId.isValid(category) || !(await Category.findById(category))) {
        throw new ApiError(400, "Invalid or non-existent category ID");
    }

    if (!mongoose.Types.ObjectId.isValid(brand) || !(await Brand.findById(brand))) {
        throw new ApiError(400, "Invalid or non-existent brand ID");
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
        const allProducts = await Product.find()
            .sort({createdAt: -1})
            .populate('category', 'name slug')
            .populate('brand', 'name slug');

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
});

// Fetch Products
export const fetchEditProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;

    if (!id) {
        throw new ApiError(401, "Edit Product Id is Required !")
    }
    const product = await Product.findById(id.toString())

    res
        .status(200)
        .json(new ApiResponse(200, product, "Edit Product Fetched Succesfully !"))
});

// Update Products
export const updateProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;

    try {
        const formData = req.body;

        // ✅ Normalize number fields (Skip empty strings)
        const numberFields = ["stockQuantity", "regularPrice", "salePrice"];
        numberFields.forEach((field) => {
            if (formData[field] !== undefined && formData[field] !== "") {
                formData[field] = Number(formData[field]);
            }
        });

        // ✅ Convert tags string → array
        if (formData.tags && typeof formData.tags === "string") {
            formData.tags = formData.tags.split(",").map(tag => tag.trim());
        }

        // ✅ Upload new images if any
        if (req.files && req.files.productImage) {
            const imagePaths = req.files.productImage.map((file) => file.path);
            const uploadedUrls = [];

            for (const path of imagePaths) {
                try {
                    const result = await uploadOnCloudinary(path);
                    if (result?.secure_url) uploadedUrls.push(result.secure_url);
                    fs.unlinkSync(path);  // ✅ Clean local temp file
                } catch (cloudErr) {
                    console.error("Cloudinary Upload Error:", cloudErr);
                }
            }

            if (uploadedUrls.length > 0) {
                formData.productImage = uploadedUrls;  // ✅ Replace images
            }
        }

        // ✅ Prevent empty updates
        if (Object.keys(formData).length === 0) {
            throw new ApiError(400, "No valid fields provided for update.");
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, formData, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            throw new ApiError(404, "Product not found");
        }

        res.status(200).json(new ApiResponse(200, updatedProduct, "Product updated successfully"));

    } catch (error) {
        console.error("❌ Update Product Error:", error);
        throw new ApiError(500, error.message || "Internal server error during product update");
    }
});

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
