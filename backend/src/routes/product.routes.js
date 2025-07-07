import {Router} from "express";

import {
    addProduct, createProductsBulk,
    deleteProducts,
    fetchEditProduct,
    getAllProducts, getShuffledProducts,
    updateProduct,
} from "../controllers/product.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const productRouter = Router();

productRouter.route('/add-product').post(upload.fields([
        {
            name: 'productImage',
            maxCount: 10
        },
    ]),
    addProduct
);

productRouter.route('/get-all-products').get(getAllProducts)
productRouter.route('/delete-product/:id').delete(deleteProducts)
productRouter.route('/get-edit-product/:id').get(fetchEditProduct)
productRouter.route('/update-product/:id').patch(upload.fields([{name: 'productImage', maxCount: 10}]), updateProduct);
productRouter.post('/create-products-bulk', createProductsBulk);
productRouter.get('/get-shuffled-products', getShuffledProducts); // /api/products/shuffled


export {productRouter}