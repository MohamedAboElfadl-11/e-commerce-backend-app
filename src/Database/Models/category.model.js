import mongoose from "mongoose";

const categoryDatabaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    }
}, {
    timestamps: true
})

const CategoryModel = mongoose.models.categories || mongoose.model('categories', categoryDatabaseSchema)
export default CategoryModel