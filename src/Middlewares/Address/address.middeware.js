import AddressModel from "../../Database/Models/address.model.js";

const addressMiddleware = () => {
    return async (req, res, next) => {
        const user = req.loginUser;
        const { addressId } = req.params;
        const address = await AddressModel.findById(addressId);
        if (!address) return res.status(404).json({ message: 'Address not found' });
        if (user._id.toString() !== address.userAddress.toString()) return res.status(409).json({ message: 'unauthorized' })
        req.address = address;
        next()
    }
}

export default addressMiddleware