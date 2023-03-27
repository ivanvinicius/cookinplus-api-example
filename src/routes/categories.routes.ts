import { Router } from 'express'

import { checkAuthMiddleware } from '../utils/checkAuthMiddleware'
import { CategoriesRepository } from '../useCases/categories/CategoriesRepository'

const categoriesRoutes = Router()
const categoriesRepository = CategoriesRepository.getInstance()

categoriesRoutes.get('/categories', (request, response) => {
  const { page = 1, per_page = 10 } = request.query

  const totalCount = categoriesRepository.getNumberOfRegisters().toString()

  const pageStart = (Number(page) - 1) * Number(per_page)
  const pageEnd = pageStart + Number(per_page)
  
  const categories = categoriesRepository.list({pageStart, pageEnd})

  response.setHeader('X-total-Count', totalCount)

  return response.status(200).json(categories)
})

categoriesRoutes.post('/categories', checkAuthMiddleware, (request, response) => {
  const { name, parent_id } = request.body

  const categoryAlreadyExists = categoriesRepository.findByName(name)

  if(categoryAlreadyExists) {
    return response.status(400).json({
      error: true, 
      code: 'category.exists', 
      message: 'Categoria já foi cadastrada.'
    })
  }

  categoriesRepository.create({ name, parent_id })

  return response.status(201).send()
})

categoriesRoutes.put('/categories/:id', checkAuthMiddleware, (request, response) => {
  const { id } = request.params
  const {name, parent_id} = request.body

  const findCategory = categoriesRepository.findById(id)

  if(!findCategory) {
    return response.status(400).json({
      error: true, 
      code: 'category.notfound', 
      message: 'Categoria não foi encontrada.'
    })
  }

  const updatedCategory = categoriesRepository.update({id, name, parent_id})

  return response.status(200).json(updatedCategory)
})

categoriesRoutes.delete('/categories/:id', checkAuthMiddleware, (request, response) => {
  const { id } = request.params

  const findCategory = categoriesRepository.findById(id)

  if(!findCategory) {
    return response.status(400).json({ 
      error: true, 
      code: 'category.notfound', 
      message: 'Categoria não foi encontrada.'
    })
  }

  categoriesRepository.delete(id)

  return response.status(200).send()
})

export { categoriesRoutes }