import AddressModel from "../../../../Database/Models/address.model.js";

// create address
export const addAddressServices = async (req, res) => {
    const user = req.loginUser;
    const userAddressData = req.body;
    userAddressData.userAddress = user._id;
    console.log(userAddressData)
    await AddressModel.create(userAddressData)
    res.status(200).json({ message: 'Address added successfully' })
}

// get all addrsses
export const getAllAddresses = async (req, res) => {
    const user = req.loginUser;
    const addresses = await AddressModel.find({ userAddress: user._id });
    res.status(200).json({ addresses })
}

// get specific address
export const getAddress = async (req, res) => {
    const address = req.address
    res.status(200).json({ address });
}

// update address
export const updateAddress = async (req, res) => {
    const address = req.address
    const updatedAddressData = req.body;
    if (updatedAddressData.street) address.street = updatedAddressData.street
    if (updatedAddressData.city) address.city = updatedAddressData.city
    if (updatedAddressData.country) address.country = updatedAddressData.country
    await address.save();
    res.status(200).json({ message: 'address updated successfully' })
}

// delete address
export const deleteAddress = async (req, res) => {
    const address = req.address
    await AddressModel.deleteOne({ _id: address._id })
    res.status(200).json({ message: 'address deleted successfully' })
}