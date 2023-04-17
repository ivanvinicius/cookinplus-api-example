import { Router } from 'express'

import { usersRoutes } from '../routes/users.routes'
import { categoriesRoutes } from '../routes/categories.routes'
import { sectionsRoutes } from '../routes/sections.routes'
import { nutritionistsRoutes } from '../routes/nutritionists.routes'
import { nationalitiesRoutes } from '../routes/nationalities.routes'

const router = Router()

router.use(usersRoutes)
router.use(categoriesRoutes)
router.use(sectionsRoutes)
router.use(nutritionistsRoutes)
router.use(nationalitiesRoutes)

export { router }
