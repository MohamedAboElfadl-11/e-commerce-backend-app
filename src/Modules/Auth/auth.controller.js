import { Router } from "express";
import * as auth from "./Service/auth.service.js";
import { errorHandlerMiddleware } from "../../Middlewares/errorHandler.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import * as  validators from "../../Validation/auth.validation.js";

const authRoters = Router();

authRoters.post('/signup',
    validationMiddleware(validators.signupSchema),
    errorHandlerMiddleware(auth.signupService)
)

authRoters.post('/login',
    validationMiddleware(validators.loginSchema),
    errorHandlerMiddleware(auth.loginService),
)

export default authRoters