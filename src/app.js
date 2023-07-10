import express from 'express'
import dotenv from "dotenv"
import morgan from 'morgan'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import fileUpload from 'express-fileupload'
import cors from 'cors'

dotenv.config();
const app = express()

//Morgan
if(process.env.NODE_ENV !== "production"){
    app.use(morgan("dev"))
}
//Helmet
app.use(helmet())

app.use(express.json())
app.use(express.urlencoded( { extended: true}))

//sanitize request data
app.use(mongoSanitize())

//Enable cookie Parser
app.use(cookieParser())

//gzip compression
app.use(compression())

//file upload
app.use(fileUpload({
    useTempFiles: true,
}))

//cors
app.use(cors())

app.get('/test', (req, res) => {
    res.send("Hello Word!")
})

export default app