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
   * Save game statistics to the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} A Promise representing the completion of the operation.
   */
  async saveStats (req, res, next) {
    try {
      console.log(req.body.selectedColumnName)
      const gameStats = new GameStatsModel({
        column: req.body.selectedColumnName,
        turns: req.body.turns
      })

      await gameStats.save()

      const location = new URL(
        `${req.protocol}://${req.get('host')}${req.baseUrl}/${gameStats._id}`
      )

      res
        .location(location.href)
        .status(201)
        .json(gameStats)
    } catch (error) {
      next(error)
    }
  }
}
