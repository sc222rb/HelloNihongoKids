import { jest } from '@jest/globals'
import { GameController } from '../../src/controllers/api/game-controller.js'
import { GameStatsModel } from '../../src/models/GameStatsModel.js'

/**
 * Mocks the GameStatsModel for unit testing the GameController.
 */
jest.mock('../../src/models/GameStatsModel.js')

/**
 * Unit tests for the findAll method in the GameController class.
 * Ensures that all game statistics for a given user are fetched and returned correctly.
 */
describe('GameController Unit Tests', () => {
  /**
   * Tests the findAll method.
   */
  describe('findAll', () => {
    /**
     * Tests the successful retrieval of game statistics for a given user.
     */
    it('should fetch and return all game stats for a given user', async () => {
      // Mock request, response, and next middleware function
      const req = { user: { userId: 'mockUserId' } }
      const res = { json: jest.fn() }
      const next = jest.fn()

      // Mock data to be returned by GameStatsModel.find
      const mockStats = [
        { selectedColumnName: 'あ行', turns: 10, userId: 'mockUserId' },
        { selectedColumnName: 'か行', turns: 15, userId: 'mockUserId' }
      ]

      // Mock GameStatsModel.find as a Jest function
      GameStatsModel.find = jest.fn().mockResolvedValue(mockStats)

      // Create an instance of GameController
      const controller = new GameController()

      // Call the method to test
      await controller.findAll(req, res, next)

      // Assert that res.json was called with the mockStats
      expect(res.json).toHaveBeenCalledWith(mockStats)
    })
  })

  /**
   * Tests the saveStat method.
   */
  describe('saveStat', () => {
    /**
     * Tests the successful saving of game stats to the database.
     */
    it('should save game stats to the database and return the saved document', async () => {
      // Mock request, response, and next middleware function
      const req = {
        body: { selectedColumnName: 'は行', turns: 20, userId: 'mockUserId' },
        protocol: 'http', // Mocking protocol property
        get: jest.fn().mockReturnValue('localhost'), // Mocking get method to return 'localhost'
        baseUrl: '/hnk/api/v1/game' // Mocking baseUrl property
      }
      const res = {
        location: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }
      const next = jest.fn()

      // Mock data to be returned by GameStatsModel.create
      const mockStat = { id: 'mockId', ...req.body }

      // Mock GameStatsModel.create as a Jest function
      GameStatsModel.create = jest.fn().mockResolvedValue(mockStat)

      // Create an instance of GameController
      const controller = new GameController()

      // Call the method to test
      await controller.saveStat(req, res, next)

      // Assert that res.status and res.json were called correctly
      const location = `${req.protocol}://${req.get('host')}${req.baseUrl}/${mockStat.id}`
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.location).toHaveBeenCalledTimes(1)
      expect(res.location).toHaveBeenCalledWith(location)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith(mockStat)
    })

    /**
     * Tests error handling in the saveStat method.
     */
    it('should call next with an error if GameStatsModel.create fails', async () => {
      // Mock request, response, and next middleware function
      const req = {
        body: { selectedColumnName: 'は行', turns: 20, userId: 'mockUserId' },
        protocol: 'http', // Mocking protocol property
        get: jest.fn().mockReturnValue('localhost'), // Mocking get method to return 'localhost'
        baseUrl: '/hnk/api/v1/game' // Mocking baseUrl property
      }
      const res = {
        location: jest.fn().mockReturnThis(), // Ensure it returns `this`
        status: jest.fn().mockReturnThis(), // Ensure it returns `this`
        json: jest.fn().mockReturnThis() // Ensure it returns `this`
      }
      const next = jest.fn()

      // Mock error to be thrown by GameStatsModel.create
      const mockError = new Error('Database Error')

      // Mock GameStatsModel.create as a Jest function to reject with an error
      GameStatsModel.create = jest.fn().mockRejectedValue(mockError)

      // Create an instance of GameController
      const controller = new GameController()

      // Call the method to test
      await controller.saveStat(req, res, next)

      // Assert that next was called with the mockError
      expect(next).toHaveBeenCalledTimes(1)
      expect(next).toHaveBeenCalledWith(mockError)
    })
  })
})
