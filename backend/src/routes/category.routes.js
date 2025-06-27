import {Router} from "express";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
} from "../controllers/category.controller.js";

const categoryRouter = Router();

// Create Category
categoryRouter.route('/create-category').post(createCategory)

// Get-All Category
categoryRouter.route('/get-all-categories').get(getAllCategories)

// Delete Category
categoryRouter.route('/delete-category').delete(deleteCategory)

// Update Category
categoryRouter.route('/update-category').patch(updateCategory)

// Get Category By Id
categoryRouter.route('/get-category/:id').get(getCategoryById);


export {categoryRouter};
