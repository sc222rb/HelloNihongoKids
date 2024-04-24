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

// GET characters/:id
router.get('/:id', (req, res, next) => controller.find(req, res, next))

// POST characters
router.post('/', (req, res, next) => controller.create(req, res, next))

// PUT characters/:id
router.put('/:id', (req, res, next) => controller.update(req, res, next))

// Delete characters/:id
router.delete('/:id', (req, res, next) => controller.delete(req, res, next))
