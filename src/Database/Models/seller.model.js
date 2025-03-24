import mongoose from "mongoose";

// dreem 2000 center shahen...etc
const sellerDatabaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    storeName: {
        type: String,
        required: true,
        unique: true
    },
    storeDescription: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }],
    ratings: {
        type: Number,
        default: 0
    },
    totalSales: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const SellerModel = mongoose.models.sellers || mongoose.model('sellers', sellerDatabaseSchema);
export default SellerModel;
