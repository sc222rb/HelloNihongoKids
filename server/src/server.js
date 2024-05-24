/**
 * The starting point of the application.
 *
 * @author Sayaka Chishiki Jakobsson
 * @version 1.0.0
 */

import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'
import cors from 'cors'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const mockToken = 'mockToken'

/**
 * Initializes the Express application.
 *
 * This function connects to the database, sets up middleware,
 * serves static files, registers routes, and sets up the error handler.
 * It should be called once before starting the server.
 *
 * @async
 * @function
 * @returns {Promise<void>} Resolves when the application is initialized.
 */
async function initializeApp () {
  try {
    const uri = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_URI : process.env.DB_CONNECTION_STRING
    if (!uri) {
      throw new Error('Database URI not provided')
    }
    // Connect to the database.
    await connectDB()

    // Get the directory name of this module's path.
    const directoryFullName = dirname(fileURLToPath(import.meta.url))

    // Set the base URL to use for all relative URLs in a document.
    const baseURL = process.env.BASE_URL || '/'

    // Serve static files from the 'build' directory
    app.use(baseURL, express.static(`${directoryFullName}/../../client/build`))

    // Define route to serve the React app
    app.get(`${baseURL}/*`, (req, res) => {
      res.sendFile(`${directoryFullName}/../../client/build/index.html`)
    })

    // Mock authentication middleware for testing purposes
    if (process.env.NODE_ENV === 'test') {
      app.use((req, res, next) => {
        if (req.headers.authorization === `Bearer ${mockToken}`) {
          req.user = { userId: 'mockUserId' }
        }
        next()
      })
    }

    // Parse requests of the content type application/x-www-form-urlencoded.
    // Populates the request object with a body object (req.body).
    app.use(express.urlencoded({ extended: false }))

    // Serve static files.
    // app.use(express.static(join(directoryFullName, '..', 'public')))

    // Enable CORS
    app.use(cors(
      {
        origin: ['https://hello-nihongo-kids.vercel.com'],
        methods: ['POST', 'GET'],
        credentials: true
      }
    ))

    // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
    app.use(helmet())
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            'default-src': ["'self'"],
            'script-src': [
              "'self'",
              'cdn.jsdelivr.net'
            ],
            'img-src': ["'self'"]
          }
        },
        crossOriginResourcePolicy: { policy: 'cross-origin' },
        crossOriginEmbedderPolicy: false
      })
    )

    // Set up a morgan logger using the dev format for log entries.
    app.use(logger('dev'))

    // Parse requests of the content type application/json.
    app.use(express.json())

    // Register routes.
    app.use(baseURL, router)

    // Error handler.
    app.use(function (err, req, res, next) {
      err.status = err.status || 500

      if (req.app.get('env') !== 'development') {
        return res
          .status(err.status)
          .json({
            status: err.status,
            message: err.message
          })
      }

      // Development only!
      // Only providing detailed error in development.
      return res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message,
          cause: err.cause
            ? {
                status: err.cause.status,
                message: err.cause.message,
                stack: err.cause.stack
              }
            : null,
          stack: err.stack
        })
    })
  } catch (err) {
    console.error('Failed to initialize the application:', err)
    process.exit(1)
  }
}

let server

/**
 * Starts the server and initializes the app.
 */
async function startServer () {
  await initializeApp()
  const PORT = process.env.PORT || 3000
  server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startServer()
}

export { app, startServer, server }
