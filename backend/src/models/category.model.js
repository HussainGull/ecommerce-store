import mongoose, {Schema} from 'mongoose';
import slugify from 'slugify';

const categorySchema = new Schema({
    name: {type: String, required: true, unique: true},
    slug: {type: String, unique: true},
}, {timestamps: true});

categorySchema.pre('save', function (next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});

export const Category = mongoose.model('Category', categorySchema);
