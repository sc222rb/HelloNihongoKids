/**
 * API version 1 routes.
 *
 * @author Sayaka Chishiki Jakobsson
 * @version 1.0.0
 */

import express from 'express'
import { router as accountRouter } from './account-router.js'
import { router as usersRouter } from './users-router.js'
import { router as charactersRouter } from './characters-router.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))
router.get('/status', (req, res) => res.json({ message: 'API version 1 is up and running!' }))
router.use('/', accountRouter)
router.use('/users', usersRouter)
router.use('/characters', charactersRouter)
