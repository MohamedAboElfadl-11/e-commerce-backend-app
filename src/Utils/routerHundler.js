import { globalErrorHandler } from "../Middlewares/errorHandler.middleware.js"
import addressRouters from "../Modules/User/Address/address.controller.js"
import authRouters from "../Modules/User/Auth/auth.controller.js"
import profileRouters from "../Modules/User/Profile/user.controller.js"

const controllerHandler = (app) => {
    app.use('/auth', authRouters)
    app.use('/profile', profileRouters)
    app.use('/address', addressRouters)
    app.use(globalErrorHandler)
}

export default controllerHandler