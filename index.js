const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8080
// const {logs, API_LOGGER} = require('./middleware/request')
const {RequestLogger} = require('./middleware/request')


// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+'/public'))
app.set('view engine','ejs');

// logs the request data to console in table form
const RL = new RequestLogger({ignore_urls : ['/logs'],parameters:["index","path","method","query","body","time"], showLatestFirst : true})
app.use(RL.Console())
app.use('/logs',RL.Webpage())

app.get('/' , (req, res) => {
  res.send("hello world")
})
app.post('/' , (req, res) => {
  res.send("hello world")
})

app.listen(PORT, ()=>{
  console.log(`Server started at port : ${PORT}`)
})