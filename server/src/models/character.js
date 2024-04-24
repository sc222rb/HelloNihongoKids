/**
 * Mongoose model Character.
 *
 * @author Sayaka Chishiki Jakobsson
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  hiragana: {
    type: String,
    required: true
  },
  katakana: {
    type: String,
    required: true
  },
  romaji: {
    type: String,
    required: true
  }
})

// Create a model using the schema.
export const Character = mongoose.model('Character', schema)
