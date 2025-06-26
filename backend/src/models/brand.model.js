import mongoose, {Schema} from 'mongoose';
import slugify from 'slugify';

const brandSchema = new Schema({
    name: {type: String, required: true, unique: true},
    slug: {type: String, unique: true},
}, {timestamps: true});

brandSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});

export const Brand = mongoose.model('Brand', brandSchema);
