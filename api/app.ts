/**
 * API Server
 */

import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import aiEditRoutes from './routes/ai-edit.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app: express.Application = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.use('/api/ai-edit', aiEditRoutes)

app.use(
  '/api/health',
  (req: Request, res: Response, next: NextFunction): void => {
    res.status(200).json({
      success: true,
      message: 'ok',
      timestamp: new Date().toISOString(),
    })
  },
)

app.use(express.static(path.join(__dirname, '..', 'dist')))

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server Error:', error)
  res.status(500).json({
    success: false,
    error: 'Server internal error',
    message: error.message,
  })
})

export default app
