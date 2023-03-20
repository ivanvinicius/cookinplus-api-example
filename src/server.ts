import cors from 'cors';
import express, { NextFunction, request, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import decode from 'jwt-decode'
import { generateJwtAndRefreshToken } from './auth';
import { auth } from './config';

import { checkRefreshTokenIsValid, users, seedUserStore, invalidateRefreshToken } from './database';
import { CreateSessionDTO, DecodedToken } from './types';
import { CategoriesRepository } from './useCases/categories/CategoriesRepository'


const app = express();

const categoriesRepository = CategoriesRepository.getInstance()



app.use(express.json());
app.use(cors({ exposedHeaders: ['X-total-Count'] }))

app.use((_request, _response, next) => {
  setTimeout(next, 3000)
});

seedUserStore();

function checkAuthMiddleware(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  const [, token] = authorization?.split(' ');

  if (!token) {
    return response 
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  try {
    const decoded = jwt.verify(token as string, auth.secret) as DecodedToken;

    request.user = decoded.sub;

    return next();
  } catch (err) {

    return response 
      .status(401)
      .json({  error: true, code: 'token.expired', message: 'Token invalid.' })
  }
}

function addUserInformationToRequest(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  const [, token] = authorization?.split(' ');

  if (!token) {
    return response 
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  try {
    const decoded = decode(token as string) as DecodedToken;

    request.user = decoded.sub;

    return next();
  } catch (err) {
    return response 
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Invalid token format.' })
  }
}

app.post('/sessions', (request, response) => {
  const { email, password } = request.body as CreateSessionDTO;

  const user = users.get(email);

  if (!user || password !== user.password) {
    return response
      .status(401)
      .json({ 
        error: true, 
        message: 'E-mail or password incorrect.'
      });
  }

  const { token, refreshToken } = generateJwtAndRefreshToken(email, {
    permissions: user.permissions,
    roles: user.roles,
  })

  return response.json({
    token,
    refreshToken,
    permissions: user.permissions,
    roles: user.roles,
  });
});

app.post('/refresh', addUserInformationToRequest, (request, response) => {
  const email = request.user;
  const { refreshToken } = request.body;

  const user = users.get(email);

  if (!user) {
    return response
      .status(401)
      .json({ 
        error: true, 
        message: 'User not found.'
      });
  }

  if (!refreshToken) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is required.' });
  }

  const isValidRefreshToken = checkRefreshTokenIsValid(email, refreshToken)

  if (!isValidRefreshToken) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is invalid.' });
  }

  invalidateRefreshToken(email, refreshToken)

  const { token, refreshToken: newRefreshToken } = generateJwtAndRefreshToken(email, {
    permissions: user.permissions,
    roles: user.roles,
  })

  return response.json({
    token,
    refreshToken: newRefreshToken,
    permissions: user.permissions,
    roles: user.roles,
  });
});

app.get('/me', checkAuthMiddleware, (request, response) => {
  const email = request.user;

  const user = users.get(email);

  if (!user) {
    return response
      .status(400)
      .json({ error: true, message: 'User not found.' });
  }

  return response.json({
    email,
    permissions: user.permissions,
    roles: user.roles,
  })
});

//categories ======================================================

app.get('/categories', (request, response) => {
  const { page = 1, per_page = 10 } = request.query

  const totalCount = categoriesRepository.getNumberOfRegisters().toString()

  const pageStart = (Number(page) - 1) * Number(per_page)
  const pageEnd = pageStart + Number(per_page)
  
  const categories = categoriesRepository.list({pageStart, pageEnd})

  response.setHeader('X-total-Count', totalCount)

  return response.status(200).json(categories)
})

app.post('/categories', checkAuthMiddleware, (request, response) => {
  const { name, parent_id } = request.body

  const categoryAlreadyExists = categoriesRepository.findByName(name)

  if(categoryAlreadyExists) {
    return response.status(400).json({error: true, message: 'Category already exists'})
  }

  categoriesRepository.create({ name, parent_id })

  return response.status(201).send()
})

app.put('/categories/:id', checkAuthMiddleware, (request, response) => {
  const { id } = request.params
  const {name, parent_id} = request.body

  const findCategory = categoriesRepository.findById(id)

  if(!findCategory) {
    return response.status(400).json({error: true, message: 'Category not found'})
  }

  const updatedCategory = categoriesRepository.update({id, name, parent_id})

  return response.status(200).json(updatedCategory)
})

app.delete('/categories/:id', checkAuthMiddleware, (request, response) => {
  const { id } = request.params

  const findCategory = categoriesRepository.findById(id)

  if(!findCategory) {
    return response.status(400).json({error: true, message: 'Category not found'})
  }

  categoriesRepository.delete(id)

  return response.status(200).send()
})


app.listen(9095);