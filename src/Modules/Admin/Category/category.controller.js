import { Router } from 'express'
import * as category from './Service/category.service.js';
import { errorHandlerMiddleware } from '../../../Middlewares/errorHandler.middleware.js';
import authenticationMiddlware from '../../../Middlewares/authentication.middleware.js';
import { authorizationMiddleware } from '../../../Middlewares/authorization.middleware.js';
import { roles } from '../../../Constants/constants.js';

const { ADMIN } = roles
const categoryRouters = Router();

categoryRouters.use(errorHandlerMiddleware(authenticationMiddlware()))
categoryRouters.use(authorizationMiddleware([ADMIN]))

categoryRouters.post('/create',
    errorHandlerMiddleware(category.createCategoryService)
)

categoryRouters.patch('/update/:categoryId',
    errorHandlerMiddleware(category.updateCategoryService)
)

categoryRouters.get('/all-categories',
    errorHandlerMiddleware(category.allCategoriesService)
)

categoryRouters.get('/search/:categoryId',
    errorHandlerMiddleware(category.searchCategoryService)
)

categoryRouters.delete('/delete/:categoryId',
    errorHandlerMiddleware(category.deleteCategoryService)
)

export default categoryRouters