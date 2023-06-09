import jwt from 'jsonwebtoken'

import { auth } from '../config/auth'
import { createRefreshToken } from '../database'

export function generateJwtAndRefreshToken(
  email: string,
  payload: object = {},
) {
  const token = jwt.sign(payload, auth.secret, {
    subject: email,
    expiresIn: 5 * 60, // 1 min
  })

  const refreshToken = createRefreshToken(email)

  return {
    token,
    refreshToken,
  }
}
