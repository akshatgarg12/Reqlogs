const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8080
const {logs, API_LOGGER} = require('./middleware/request')


// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(API_LOGGER)
app.use(logs)
app.use(express.static(__dirname+'/public'))
app.set('view engine','ejs');


app.get('/' , (req, res) => {
  res.send("hello world")
})
app.post('/' , (req, res) => {
  res.send("hello world")
})

app.listen(PORT, ()=>{
  console.log(`Server started at port : ${PORT}`)
})