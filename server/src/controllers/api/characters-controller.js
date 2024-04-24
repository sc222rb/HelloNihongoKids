/**
 * Module for the CharactersController.
 *
 * @author Sayaka Chishiki Jakobsson
 * @version 1.0.0
 */

import createError from 'http-errors'
import { Character } from '../../models/character.js'

/**
 * Encapsulates a controller.
 */
export class CharactersController {
  /**
   * Provide req.character to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the character to load.
   */
  async loadCharacter (req, res, next, id) {
    try {
      // Get the character.
      const character = await Character.findById(id)

      // If no task found send a 404 (Not Found).
      if (!character) {
        next(createError(404))
        return
      }

      // Provide the character to req.
      req.character = character

      // Next middleware.
      next()
    } catch (error) {
      next(error)
    }
  }

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
      console.log(characters)
      res.json(characters)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Add a new character.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async create (req, res, next) {
    try {
      console.log(req.body)
      const character = new Character({
        hiragana: req.body.hiragana,
        katakana: req.body.katakana,
        romaji: req.body.romaji
      })

      await character.save()

      const location = new URL(
        `${req.protocol}://${req.get('host')}${req.baseUrl}/${character._id}`
      )

      res
        .location(location.href)
        .status(201)
        .json(character)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Updates a specific character.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async update (req, res, next) {
    try {
      req.character.hiragana = req.body.hiragana
      req.character.katakana = req.body.katakana
      req.character.romaji = req.body.romaji

      await req.character.save()

      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes the specified character.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async delete (req, res, next) {
    try {
      await req.character.deleteOne()

      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }
}
