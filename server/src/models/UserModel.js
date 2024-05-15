/**
 * @file Defines the User model.
 * @module models/UserModel
 * @author Sayaka Chishiki Jakobsson
 */

import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import validator from 'validator'
import { BASE_SCHEMA } from './baseSchema.js'

const { isEmail } = validator

// Create a schema.
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'User name is required.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required.'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Please provide a valid email address.']
  },
  password: {
    type: String,
    minLength: [10, 'The password must be of minimum length 10 characters.'],
    maxLength: [256, 'The password must be of maximum length 256 characters.'],
    required: [true, 'Password is required.']
  },
  avatar: {
    type: String
  }
})

schema.add(BASE_SCHEMA)

// Salts and hashes password before save.
schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10)
})

/**
 * Authenticates a user.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<UserModel>} A promise that resolves with the authenticated user if the email and password match, otherwise rejects with an error.
 * @throws {Error} If the email doesn't exist or the password is incorrect.
 */
schema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email })

  // If no user found or password is wrong, throw an error.
  if (!(await bcrypt.compare(password, user?.password))) {
    throw new Error('Invalid credentials.')
  }

  // User found and password correct, return the user.
  return user
}

// Create a model using the schema.
export const UserModel = mongoose.model('User', schema)
