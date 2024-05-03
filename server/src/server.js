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

try {
  await connectDB()

  const app = express()

  // Get the directory name of this module's path.
  const directoryFullName = dirname(fileURLToPath(import.meta.url))

  // Serve static files from the 'build' directory
  app.use(express.static(`${directoryFullName}/../../client/build`))

  // Define route to serve the React app
  app.get('*', (req, res) => {
    res.sendFile(`${directoryFullName}/../../client/build/index.html`)
  })

  // Parse requests of the content type application/x-www-form-urlencoded.
  // Populates the request object with a body object (req.body).
  app.use(express.urlencoded({ extended: false }))

  // Serve static files.
  // app.use(express.static(join(directoryFullName, '..', 'public')))

  // Enable CORS
  app.use(cors())

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
  app.use('/', router)

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

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
