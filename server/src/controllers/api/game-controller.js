/**
 * Module for the GameController.
 *
 * @author Sayaka Chishiki Jakobsson
 * @version 1.0.0
 */

import { GameStatsModel } from '../../models/GameStatsModel.js'

/**
 * Encapsulates a controller.
 */
export class GameController {
  /**
   * Sends a JSON response containing a game.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    try {
      res.json(req.doc)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing all tasks.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findAll (req, res, next) {
    try {
      const gameStats = await GameStatsModel.find({ userId: req.user.userId })
      res.json(gameStats)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Save game statistics to the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} A Promise representing the completion of the operation.
   */
  async saveStat (req, res, next) {
    try {
      const { selectedColumnName, turns, userId } = req.body
      const gameStatDoc = await GameStatsModel.create({
        selectedColumnName,
        turns,
        userId
      })
      const location = new URL(
        `${req.protocol}://${req.get('host')}${req.baseUrl}/${gameStatDoc.id}`
      )

      res
        .location(location.href)
        .status(201)
        .json(gameStatDoc)
    } catch (error) {
      next(error)
    }
  }
}
