import { Router } from 'express'

import { usersRoutes } from '../routes/users.routes'
import { categoriesRoutes } from '../routes/categories.routes'

const router = Router()

router.use(usersRoutes)
router.use(categoriesRoutes)

export { router }