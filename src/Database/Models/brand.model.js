import mongoose from "mongoose";

// Apple Sumsung Tornedo H&M Zara...etc
const brandDatabaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }]
}, {
    timestamps: true
});

const BrandModel = mongoose.models.brands || mongoose.model('brands', brandDatabaseSchema);
export default BrandModel;
