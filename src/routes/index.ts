import { Router } from 'express'

import { usersRoutes } from '../routes/users.routes'
import { categoriesRoutes } from '../routes/categories.routes'
import { sectionsRoutes } from '../routes/sections.routes'

const router = Router()

router.use(usersRoutes)
router.use(categoriesRoutes)
router.use(sectionsRoutes)

export { router }
