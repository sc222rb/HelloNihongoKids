/**
 * @file Defines the game statistic model.
 * @module models/GameStatsModel
 * @author Sayaka Chishiki Jakobsson
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

// Create a schema.
const schema = new mongoose.Schema({
  column: {
    type: String,
    required: true
  },
  turns: {
    type: Number,
    required: true
  }
})

schema.add(BASE_SCHEMA)

// Create a model using the schema.
export const GameStatsModel = mongoose.model('GameStats', schema)
