/**
 * API version 1 routes.
 *
 * @author Sayaka Chishiki Jakobsson
 * @version 1.0.0
 */

import express from 'express'
import { CharactersController } from '../../../controllers/api/characters-controller.js'

export const router = express.Router()

const controller = new CharactersController()

// GET characters
router.get('/', (req, res, next) => controller.findAll(req, res, next))
router.get('/random', (req, res, next) => controller.getRandomCharacter(req, res, next))
