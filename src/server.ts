import express, { Request, Response } from 'express'

//Initialize express
const app: express.Application = express()

//Port
const address = '0.0.0.0:8080'
const PORT = process.env.PORT || 8080

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Defines index routes
app.get('/', async (req: Request, res: Response) => {
  res.send(
    "Welcome to Prolego. The following API's are available to be accessed:"
  )
})

//Listen for server connections
app.listen(PORT, () => console.log(`server running on ${address}`))

export default app
