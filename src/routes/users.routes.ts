import { Router } from 'express'

import { CreateSessionDTO } from '../types';
import { generateJwtAndRefreshToken } from '../auth';
import { checkAuthMiddleware } from '../utils/checkAuthMiddleware';
import { addUserInformationToRequest } from '../utils/addUserInformationToRequest';
import { checkRefreshTokenIsValid, invalidateRefreshToken, seedUserStore, users } from '../database';

seedUserStore();

const usersRoutes = Router()

usersRoutes.post('/sessions', (request, response) => {
  const { email, password } = request.body as CreateSessionDTO;

  const user = users.get(email);

  if (!user || password !== user.password) {
    return response
      .status(401)
      .json({ 
        error: true, 
        code: 'credential.invalid',
        message: 'E-mail ou senha inválidos.'
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

usersRoutes.post('/refresh', addUserInformationToRequest, (request, response) => {
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

usersRoutes.get('/me', checkAuthMiddleware, (request, response) => {
  const email = request.user;

  const user = users.get(email);

  if (!user) {
    return response
      .status(400)
      .json({ error: true,  message: 'User not found.' });
  }

  return response.json({
    email,
    permissions: user.permissions,
    roles: user.roles,
  })
});

export { usersRoutes }