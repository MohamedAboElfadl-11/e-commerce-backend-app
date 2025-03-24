import { Router } from "express";
import { errorHandlerMiddleware } from "../../../Middlewares/errorHandler.middleware.js";
import authenticationMiddlware from "../../../Middlewares/authentication.middleware.js";
import * as address from "./Services/address.service.js";
import addressMiddleware from "../../../Middlewares/Address/address.middeware.js";

const addressRouters = Router()

addressRouters.use(errorHandlerMiddleware(authenticationMiddlware()))

addressRouters.post('/add-address',
    errorHandlerMiddleware(address.addAddressServices)
)

addressRouters.get('/get-all-addresses',
    errorHandlerMiddleware(address.getAllAddresses)
)

addressRouters.get('/get-address/:addressId',
    errorHandlerMiddleware(addressMiddleware()),
    errorHandlerMiddleware(address.getAddress)
)

addressRouters.patch('/update-address/:addressId',
    errorHandlerMiddleware(addressMiddleware()),
    errorHandlerMiddleware(address.updateAddress)
)

addressRouters.delete('/delete-address/:addressId',
    errorHandlerMiddleware(addressMiddleware()),
    errorHandlerMiddleware(address.deleteAddress)
)

export default addressRouters