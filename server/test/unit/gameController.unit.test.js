import { jest } from '@jest/globals'
import { GameController } from '../../src/controllers/api/game-controller.js'
import { GameStatsModel } from '../../src/models/GameStatsModel.js'

jest.mock('../../src/models/GameStatsModel.js')

describe('GameController Unit Tests', () => {
  describe('findAll', () => {
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
})
