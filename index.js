const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8080

// DATABASE
const requests = []
// which urls to ignore
const ignore_urls = ['/logs']
// get the params which are specified only. like query, body, url, params, type,
const parameters = ["query", "path", "method", "params", "x"]
const API_LOGGER = (req, _res, next) => {
  if(!ignore_urls.includes(req.path)){
    const log = {}
    parameters.forEach((prop) => {
      log[prop] = req[prop]
    })
    requests.push(log)
  }
  next()
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(API_LOGGER)
app.use(express.static(__dirname+'/public'))
app.set('view engine','ejs');

app.get('/logs', (req, res) => {
  res.send(requests)
})

app.get('/' , (req, res) => {
  res.render('index', {name:"Akshat"});
})

app.listen(PORT, ()=>{
  console.log(`Server started at port : ${PORT}`)
})