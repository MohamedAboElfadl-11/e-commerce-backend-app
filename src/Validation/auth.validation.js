import Joi from 'joi'
import * as constants from '../Constants/constants.js'

export const signupSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().alphanum().min(3).max(30).required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phone: Joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
        password: Joi.string().min(8).max(30).required().pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/
        ).messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password must be at most 30 characters"
        }),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
            "any.only": "Passwords do not match"
        }),
        gender: Joi.string().valid(...Object.values(constants.gender)),
        role: Joi.string().valid(...Object.values(constants.roles)),
        DOB: Joi.date(),
        bio: Joi.string().max(255),
    })
}

export const loginSchema = {
    body: Joi.object({
        email: Joi.string().email().optional(),
        username: Joi.string().alphanum().min(3).max(30).optional(),
        password: Joi.string().min(8).max(30).required()
    }).xor('email', 'username')
}

export const verifyAccountSchema = {
    body: Joi.object({
        email: Joi.string().email().optional(),
        otp: Joi.string().length(6).pattern(/^\d{6}$/).required()
    })
}

export const forgetPasswordSchema = {
    body: Joi.object({
        email: Joi.string().email().optional(),
    })
}

export const resetPasswordSchema = {
    body: Joi.object({
        email: Joi.string().email().optional(),
        otp: Joi.string().length(6).pattern(/^\d{6}$/).required(),
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