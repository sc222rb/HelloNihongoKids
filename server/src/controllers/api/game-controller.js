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
   * Sends a JSON response containing a game stats.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    res.json(req.gameStat)
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
      const gameStats = await GameStatsModel.find()
      console.log('gameStats:', gameStats)
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
      const gameStat = new GameStatsModel({
        column: req.body.selectedColumnName,
        turns: req.body.turns
      })

      await gameStat.save()

      const location = new URL(
        `${req.protocol}://${req.get('host')}${req.baseUrl}/${gameStat._id}`
      )

      res
        .location(location.href)
        .status(201)
        .json(gameStat)
    } catch (error) {
      next(error)
    }
  }
}
