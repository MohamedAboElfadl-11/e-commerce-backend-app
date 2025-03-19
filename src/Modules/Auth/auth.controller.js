import { Router } from "express";
import * as auth from "./Service/auth.service.js";
import { errorHandlerMiddleware } from "../../Middlewares/errorHandler.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { signupSchema } from "../../Validation/auth.validation.js";

const authRoters = Router();

authRoters.post('/signup',
    validationMiddleware(signupSchema),
    errorHandlerMiddleware(auth.signupService)
)

export default authRoters