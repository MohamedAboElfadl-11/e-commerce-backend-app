import { comparing } from "../../../../Utils/crypto.utils.js";

// get profile service
export const getProfileService = async (req, res) => {
    const user = req.loginUser;
    const { email, firstName, lastName, gender, phone, DOB, username, password } = user;
    const userData = { email, firstName, lastName, gender, phone, DOB, username, password };
    res.status(200).json({ profile: userData })
}

// update profile service
export const updateProfileService = async (req, res) => {
    const user = req.loginUser;
    const updatedData = req.body;
    if (updatedData.firstName) user.firstName = updatedData.firstName;
    if (updatedData.lastName) user.lastName = updatedData.lastName;
    if (updatedData.grnder) user.gender = updatedData.gender;
    if (updatedData.phone) user.phone = updatedData.phone;
    if (updatedData.DOB) user.DOB = updatedData.DOB;
    if (updatedData.bio) user.bio = updatedData.bio;
    await user.save()
    res.status(200).json({ message: 'profile updated successfully' })
}

// change password
export const changePasswordService = async (req, res) => {
    const user = req.loginUser;
    const updatedPasswordData = req.body;
    const isPasswordMathed = await comparing(updatedPasswordData.oldPassword, user.password);
    if (!isPasswordMathed) return res.status(409).json({ message: "wrong passwrd" });
    user.password = updatedPasswordData.password;
    await user.save()
    res.status(200).json({ message: 'password changed successfully' })
}