import { Router } from 'express'
import { SectionsRepository } from '../useCases/sections/SectionsRepository'
import { checkAuthMiddleware } from '../utils/checkAuthMiddleware'

const sectionsRoutes = Router()

const sectionsRepository = SectionsRepository.getInstance()

sectionsRoutes.get('/sections', checkAuthMiddleware, (request, response) => {
  const { page = 1, per_page = 10 } = request.query

  const totalCount = sectionsRepository.getNumberOfRegisters().toString()

  const pageStart = (Number(page) - 1) * Number(per_page)
  const pageEnd = pageStart + Number(per_page)

  const sections = sectionsRepository.list({ pageStart, pageEnd })

  response.setHeader('x-total-count', totalCount)

  return response.status(200).json(sections)
})

sectionsRoutes.post('/sections', checkAuthMiddleware, (request, response) => {
  const { name } = request.body

  const sectionAlreadyExists = sectionsRepository.findByName(name)

  if (sectionAlreadyExists) {
    return response.status(400).json({
      error: true,
      code: 'section.exists',
      message: 'Seção já foi cadastrada.',
    })
  }

  sectionsRepository.create({ name })

  return response.status(201).send()
})

sectionsRoutes.delete(
  '/sections/:id',
  checkAuthMiddleware,
  (request, response) => {
    const { id } = request.params

    const findSection = sectionsRepository.findById(id)

    if (!findSection) {
      return response.status(400).json({
        error: true,
        code: 'section.notfound',
        message: 'Seção não foi encontrada.',
      })
    }

    sectionsRepository.delete(id)

    return response.status(200).send()
  },
)

export { sectionsRoutes }
