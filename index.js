const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8080


const requests = []

const API_LOGGER = (req, _res, next) => {
  requests.push(req.query)
  next()
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(API_LOGGER)

app.get('/logs', (req, res) => {
  res.send(requests)
})

app.get('/' , (req, res) => {
  res.send("hello world")
})

app.listen(PORT, ()=>{
  console.log(`Server started at port : ${PORT}`)
})