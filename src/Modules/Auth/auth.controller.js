import { Router } from "express";
import * as auth from "./Service/auth.service.js";
import { errorHandlerMiddleware } from "../../Middlewares/errorHandler.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import * as  validators from "../../Validation/auth.validation.js";

const authRouters = Router();

authRouters.post('/signup',
    validationMiddleware(validators.signupSchema),
    errorHandlerMiddleware(auth.signupService)
)

authRouters.post('/login',
    validationMiddleware(validators.loginSchema),
    errorHandlerMiddleware(auth.loginService),
)

authRouters.post('/verify-account',
    validationMiddleware(validators.verifyAccountSchema),
    errorHandlerMiddleware(auth.verifyAccountService)
)

authRouters.post('/forget-password',
    validationMiddleware(validators.forgetPasswordSchema),
    errorHandlerMiddleware(auth.forgetPasswordSeervice)
)

authRouters.patch('/reset-password',
    validationMiddleware(validators.resetPasswordSchema),
    errorHandlerMiddleware(auth.resetPasswordService)
)

authRouters.get('/genRefreshToken',
    errorHandlerMiddleware(auth.refreshTokenService)
)
export default authRouters