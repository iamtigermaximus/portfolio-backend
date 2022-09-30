require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const mongoString = process.env.DATABASE_URL
const routes = require('./routes/routes')

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log('connected')
  }
)

const database = mongoose.connection
const app = express()

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected')
})

app.use(express.json())
app.use('/', routes)

app.listen(process.env.PORT || 8000, (err) => {
  if (err) throw err
  console.log('Server started')
})
