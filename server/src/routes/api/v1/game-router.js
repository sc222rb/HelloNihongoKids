/**
 * API version 1 routes.
 *
 * @author Sayaka Chishiki Jakobsson
 * @version 1.0.0
 */

import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { GameController } from '../../../controllers/api/game-controller.js'

export const router = express.Router()

const controller = new GameController()

/**
 * Authenticates requests.
 *
 * If authentication is successful, `req.user`is populated and the
 * request is authorized to continue.
 * If authentication fails, an unauthorized response will be sent.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticateJWT = (req, res, next) => {
  try {
    console.log(req.headers.authorization)
    const [authenticationScheme, token] = req.headers.authorization?.split(' ')
    console.log(authenticationScheme)
    if (authenticationScheme !== 'Bearer') {
      throw new Error('Invalid authentication scheme.')
    }
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log(payload)
    req.user = {
      username: payload.sub,
      email: payload.email
    }

    next()
  } catch (err) {
    const error = createError(401)
    error.cause = err
    next(error)
  }
}

// Map HTTP verbs and route paths to controller actions.

router.post('/', authenticateJWT, (req, res, next) => controller.saveStats(req, res, next))
