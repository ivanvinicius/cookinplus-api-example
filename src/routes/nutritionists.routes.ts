import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'
import { checkAuthMiddleware } from '../utils/checkAuthMiddleware'
import { NutritionistsRepository } from '../useCases/nutritionists/NutritionistsRepository'

const upload = multer(uploadConfig)
const nutritionistsRoutes = Router()
const nutritionistsRepository = NutritionistsRepository.getInstance()

nutritionistsRoutes.get(
  '/nutritionists',
  checkAuthMiddleware,
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

nutritionistsRoutes.post(
  '/nutritionists',
  checkAuthMiddleware,
  upload.single('file'),
  (request, response) => {
    const { user_id } = request.body
    const { path } = request.file

    const nutritionistAlreadyExists =
      nutritionistsRepository.findByUserId(user_id)

    if (nutritionistAlreadyExists) {
      return response.status(400).json({
        error: true,
        code: 'nutritionist.exists',
        message: 'Nutricionista já foi cadastrado(a).',
      })
    }

    nutritionistsRepository.create({ img_path: path, user_id })

    return response.status(201).send()
  },
)

nutritionistsRoutes.delete(
  '/nutritionists/:id',
  checkAuthMiddleware,
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
