import mongoose from "mongoose";

const addressDatabaseSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    userAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, {
    timestamps: true
})

const AddressModel = mongoose.models.addresses || mongoose.model('addresses', addressDatabaseSchema)

export default AddressModel