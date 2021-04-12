const { Table } = require('console-table-printer');
const router = require('express').Router()

// DATABASE
const requests = []
// Colors of rows
const colors = {
  'GET':'white_bold',
  'POST':'yellow',
  'PATCH':'cyan',
  'PUT':'green',
  'DELETE':'red'
}
// which urls to ignore
// const ignore_urls = ['/logs']
// get the params which are specified only. like query, body, url, params, type,
// req.params is not avialable in middlewares
// const parameters = ["index","path","method","query","body","cookies","time"]

const API_LOGGER =  ({ignore_urls, parameters}) => {
  
  return (req, _res, next) => {
    // ignores the paths which are specified in the ignore_urls array
    if(!ignore_urls.includes(req.path)){
      const log = {}
      // creating the object using params
      parameters.forEach((prop) => {
        if(req[prop]){
          if(typeof(req[prop]) === "object"){
            // get all the keys of json
            const keys = Object.keys(req[prop])
            log[prop] = keys
          }
          else log[prop] = req[prop]
        }
      })
      // sets the time as now
      log["time"] = new Date()
      // index for row number
      log["index"] = requests.length+1
      // push to the global array
      requests.push(log)
      // columns for table
      const columns = parameters.map((param) => ({ name : param}))
      // table object
      const p = new Table({
        title:"Requests",
        columns,
        maxLen:5
      });
      // adding rows (this method is used to implement alternating colors)
      requests.forEach((req, idx) => {
        const color = colors[req.method] || 'white'
        p.addRow(req, {color})
      })
      // printing the table to console
      p.printTable()
    }
    next()
  }
}


router.get('/logs', (req, res) => {
  res.render('index', {logs:requests, params: parameters});
})

module.exports = {
  logs : router,
  API_LOGGER 
}