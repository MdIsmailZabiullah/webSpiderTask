import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import TaskRouter from './routes/Task.route.js'
import userRouter from './routes/User.route.js'
const app = express()

const port = process.env.PORT
const DB_URL = process.env.Mongo_url

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json("Welcome to test")
})

app.use("/user", userRouter)
app.use("/test", TaskRouter)

mongoose.connect(DB_URL)
    .then(() => {
        console.log("mongodb connected")
        app.listen(port, (req, res) => {
            console.log(`server started at http://localhost:${port}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })