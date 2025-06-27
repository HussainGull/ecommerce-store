import {Router} from "express";
import {createBrand, deleteBrand, getAllBrands, getBrandById, updateBrand} from "../controllers/brand.controller.js";


const brandRouter = Router();


// Get-All Brands
brandRouter.route('/get-all-brands').get(getAllBrands)


// Create Brand
brandRouter.route('/create-brand').post(createBrand)


// Delete Brand
brandRouter.route('/delete-brand').delete(deleteBrand)


// Update Brand
brandRouter.route('/update-brand').patch(updateBrand)


// Fetch Brand By Id
brandRouter.route('/get-brand/:id').get(getBrandById);


export {brandRouter}
