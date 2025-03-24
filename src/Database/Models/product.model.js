import mongoose from "mongoose";

const productDatabaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'categories'
    },
    brand: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'sellers'
    },
}, {
    timestamps: true
});

const ProductModel = mongoose.models.products || mongoose.model('products', productDatabaseSchema)
export default ProductModel