import Joi from 'joi'
import { gender } from '../../../Constants/constants.js'

export const updateProfileSchema = {
    body: Joi.object({
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        phone: Joi.string().pattern(/^01[0125][0-9]{8}$/).optional(),
        gender: Joi.string().valid(...Object.values(gender)).optional(),
        DOB: Joi.date().optional(),
        bio: Joi.string().max(255).optional(),
    })
}

export const changePasswordSchema = {
    body: Joi.object({
        oldPassword: Joi.string().min(8).max(30).required(),
        password: Joi.string().min(8).max(30).required().pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/
        ).messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password must be at most 30 characters"
        }),
        confirmedPassword: Joi.string().valid(Joi.ref("password")).required().messages({
            "any.only": "Passwords do not match"
        }),
    })
}
