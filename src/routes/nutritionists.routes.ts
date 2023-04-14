import { Router } from 'express'
// import { checkAuthMiddleware } from '../utils/checkAuthMiddleware'
import { NutritionistsRepository } from '../useCases/nutritionists/NutritionistsRepository'

const nutritionistsRoutes = Router()
const nutritionistsRepository = NutritionistsRepository.getInstance()

nutritionistsRoutes.get(
  '/nutritionists',

  (request, response) => {
    const { page = 1, per_page = 10 } = request.query

    const totalCount = nutritionistsRepository.getNumberOfRegisters().toString()

    const pageStart = (Number(page) - 1) * Number(per_page)
    const pageEnd = pageStart + Number(per_page)

    const nutritionists = nutritionistsRepository.list({ pageStart, pageEnd })

    response.setHeader('x-total-count', totalCount)

    return response.status(200).json(nutritionists)
  },
)

nutritionistsRoutes.post('/nutritionists', (request, response) => {
  const { img_path, user_id } = request.body

  const nutritionistAlreadyExists =
    nutritionistsRepository.findByUserId(user_id)

  if (nutritionistAlreadyExists) {
    return response.status(400).json({
      error: true,
      code: 'nutritionist.exists',
      message: 'Nutricionista já foi cadastrado(a).',
    })
  }

  nutritionistsRepository.create({ img_path, user_id })

  return response.status(201).send()
})

nutritionistsRoutes.delete(
  '/sections/:id',

  (request, response) => {
    const { id } = request.params

    const findNutritionist = nutritionistsRepository.findById(id)

    if (!findNutritionist) {
      return response.status(400).json({
        error: true,
        code: 'nutritionist.notfound',
        message: 'Nutricionista não foi encontrado(a).',
      })
    }

    nutritionistsRepository.delete(id)

    return response.status(200).send()
  },
)

export { nutritionistsRoutes }