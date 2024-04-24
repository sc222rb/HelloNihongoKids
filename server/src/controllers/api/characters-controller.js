/**
 * Module for the CharactersController.
 *
 * @author Sayaka Chishiki Jakobsson
 * @version 1.0.0
 */

import { Character } from '../../models/character.js'

/**
 * Encapsulates a controller.
 */
export class CharactersController {
  /**
   * Sends a JSON response containing a character.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    res.json(req.character)
  }

  /**
   * Sends a JSON response containing all characters.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findAll (req, res, next) {
    try {
      const characters = await Character.find()
      res.json(characters)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing a random character.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getRandomCharacter (req, res, next) {
    try {
      const characters = await Character.find()
      const randomIndex = Math.floor(Math.random() * characters.length)
      const randomCharacter = characters[randomIndex]
      res.json(randomCharacter)
    } catch (error) {
      next(error)
    }
  }
}
