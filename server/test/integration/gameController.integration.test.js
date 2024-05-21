import request from 'supertest'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { GameStatsModel } from '../../src/models/GameStatsModel.js'
import { app, startServer, server } from '../../src/server.js'

let mongod
let mockToken

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()
  process.env.TEST_DB_URI = uri // Set the test DB URI environment variable
  mockToken = 'mockToken'
  await startServer() // Start the server for testing

  // Create a mock token for authentication with 'sub' field
  mockToken = jwt.sign(
    { sub: 'mockUserId', email: 'test@example.com' },
    process.env.ACCESS_TOKEN_SECRET
  )
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
  server.close() // Close the server after tests
})

beforeEach(async () => {
  await GameStatsModel.deleteMany({})
})

describe('GameController Integration Tests', () => {
  describe('GET /hnk/api/v1/game', () => {
    it('should return an array of game stats for a given user', async () => {
      const userId = 'mockUserId'
      await GameStatsModel.create([
        { selectedColumnName: 'あ行', turns: 10, userId },
        { selectedColumnName: 'か行', turns: 15, userId }
      ])
      const response = await request(app)
        .get('/hnk/api/v1/game')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${mockToken}`)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBe(2)
      expect(response.body[0].selectedColumnName).toBe('あ行')
      expect(response.body[0].turns).toBe(10)
      expect(response.body[1].selectedColumnName).toBe('か行')
      expect(response.body[1].turns).toBe(15)
    })
  })

  describe('POST /hnk/api/v1/game', () => {
    it('should save game stats to the database and return a 201 response', async () => {
      const gameStatsData = {
        selectedColumnName: 'さ行',
        turns: 20,
        userId: 'mockUserId'
      }

      const response = await request(app)
        .post('/hnk/api/v1/game')
        .send(gameStatsData)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${mockToken}`)
      expect(response.status).toBe(201)
      expect(response.body.selectedColumnName).toBe('さ行')
      expect(response.body.turns).toBe(20)
      expect(response.body.userId).toBe('mockUserId')

      const savedGameStats = await GameStatsModel.findOne({ selectedColumnName: 'さ行' })
      expect(savedGameStats).toBeDefined()
      expect(savedGameStats.turns).toBe(20)
      expect(savedGameStats.userId).toBe('mockUserId')
    })
  })
})
