import cors from 'cors'
import express from 'express'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(cors({ exposedHeaders: ['x-total-count'] }))
app.use((_request, _response, next) => {
  setTimeout(next, 1000)
})
app.use(router)

app.listen(9095)
