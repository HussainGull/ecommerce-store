import mongoose, {Schema} from 'mongoose';

export const productSchema = new Schema({
        productName: {
            type: String,
            required: true,
            unique: false,
            index: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            unique: false,
            index: true,
            trim: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
            required: true

        },
        sku: {
            type: String,
            required: true,
            trim: true
        },
        stockQuantity: {
            type: Number,
            required: true,
            trim: true
        },
        regularPrice: {
            type: Number,
            required: true,
            trim: true
        },
        salePrice: {
            type: Number,
            required: true,
            trim: true
        },
        tags: {
            type: Array,
            required: true,
            trim: true
        },
        productImage: {
            type: [String],
            required: true,
            validate: [arr => arr.length > 0, 'At least one image is required']
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        reviews: [{
            type: String,
            trim: true
        }]

    }, {
        timestamps: true,
    }
);


export const Product = mongoose.model('Product', productSchema);

