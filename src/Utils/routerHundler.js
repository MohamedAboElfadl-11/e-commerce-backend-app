import { globalErrorHandler } from "../Middlewares/errorHandler.middleware.js"
import authRoters from "../Modules/Auth/auth.controller.js"

const controllerHandler = (app) => {
    app.use('/auth', authRoters)
    app.use(globalErrorHandler)
}

export default controllerHandler