import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'
import { checkAuthMiddleware } from '../utils/checkAuthMiddleware'
import { NationalitiesRepository } from '../useCases/nationalities/NationalitiesRepository'

const upload = multer(uploadConfig)
const nationalitiesRoutes = Router()
const nationalitiesRepository = NationalitiesRepository.getInstance()

nationalitiesRoutes.get(
  '/nationalities',
  checkAuthMiddleware,
  (request, response) => {
    const { page = 1, per_page = 10 } = request.query

    const totalCount = nationalitiesRepository.getNumberOfRegisters().toString()

    const pageStart = (Number(page) - 1) * Number(per_page)
    const pageEnd = pageStart + Number(per_page)

    const nationalities = nationalitiesRepository.list({ pageStart, pageEnd })

    response.setHeader('x-total-count', totalCount)

    return response.status(200).json(nationalities)
  },
)

nationalitiesRoutes.post(
  '/nationalities',
  checkAuthMiddleware,
  upload.single('file'),
  (request, response) => {
    const { name } = request.body
    const { path } = request.file

    const nationalityAlreadyExists = nationalitiesRepository.findByName(name)

    if (nationalityAlreadyExists) {
      return response.status(400).json({
        error: true,
        code: 'nationality.exists',
        message: 'Nacionalidade já foi cadastrada.',
      })
    }

    nationalitiesRepository.create({ img_path: path, name })

    return response.status(201).send()
  },
)

nationalitiesRoutes.delete(
  '/nationalities/:id',
  checkAuthMiddleware,
  (request, response) => {
    const { id } = request.params

    const findCategory = nationalitiesRepository.findById(id)

    if (!findCategory) {
      return response.status(400).json({
        error: true,
        code: 'nationality.notfound',
        message: 'Nacionalidade não foi encontrada.',
      })
    }

    nationalitiesRepository.delete(id)

    return response.status(200).send()
  },
)

export { nationalitiesRoutes }
