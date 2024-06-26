/**
 * Module for the AccountController.
 *
 * @author Sayaka Chishiki Jakobsson
 * @version 1.0.0
 */

import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { UserModel } from '../../models/UserModel.js'

/**
 * Encapsulates a controller.
 */
export class AccountController {
  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const user = await UserModel.authenticate(req.body.email, req.body.password)

      const payload = {
        sub: user.id,
        email: user.email
      }

      // Create the access token with the shorter lifespan.
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      // // Create the refresh token with the longer lifespan.
      // -----------------------------------------------------------------
      // 👉👉👉 This is the place to create and handle the refresh token!
      //         Quite a lot of additional implementation is required!!!
      // -----------------------------------------------------------------
      // const refreshToken = ...

      res
        .status(201)
        .json({
          access_token: accessToken,
          id: user.id
          // refresh_token: refreshToken
        })
    } catch (error) {
      // Authentication failed.
      const err = createError(401)
      err.cause = error

      next(err)
    }
  }

  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
      })

      await user.save()
      const location = new URL(
        `${req.protocol}://${req.get('host')}${req.baseUrl}/${user.id}`
      )

      res
        .location(location.href)
        .status(201)
        .json({
          id: user.id,
          username: user.username,
          email: user.email
        })
    } catch (error) {
      let err = error

      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(409)
        err.cause = error
      } else if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(400)
        err.cause = error
      }

      next(err)
    }
  }
}
