import { Router } from "express";
import * as profile from "./Services/user.service.js";
import { errorHandlerMiddleware } from "../../../Middlewares/errorHandler.middleware.js";
import authenticationMiddlware from "../../../Middlewares/authentication.middleware.js";
import { validationMiddleware } from "../../../Middlewares/validation.middleware.js";
import * as validators from "../../../Validation/User/Profile/profile.validation.js";

const profileRouters = Router();

profileRouters.use(errorHandlerMiddleware(authenticationMiddlware()))

profileRouters.get('/get-profile',
    errorHandlerMiddleware(profile.getProfileService)
)

profileRouters.patch('/update-profile',
    validationMiddleware(validators.updateProfileSchema),
    errorHandlerMiddleware(profile.updateProfileService)
)

profileRouters.patch('/change-password',
    errorHandlerMiddleware(profile.changePasswordService)
)

export default profileRouters;