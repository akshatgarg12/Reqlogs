import Table from 'console-table-printer'
import {Request, Response, NextFunction} from 'express'

const COLOR = {
  white_bold : "white_bold",
  yellow : "yellow",
  cyan : "cyan", 
  green : "green",
  red : "red"
}
// Colors of rows
const colors = {
  'GET':COLOR.white_bold,
  'POST':COLOR.yellow,
  'PATCH':COLOR.cyan,
  'PUT':COLOR.green,
  'DELETE':COLOR.red
}
const CLASS = {
  'GET':'success',
  'POST':'info',
  'PATCH':'active',
  'PUT':'warning',
  'DELETE':'danger'
}

function colorTextLog(text:string, color:string) { return `\x1b[${color}m${text}\x1b[0m`; }

// which urls to ignore
// const ignore_urls = ['/logs']
// get the params which are specified only. like query, body, url, params, type,
// req.params is not avialable in middlewares
// const parameters = ["index","path","method","query","body","cookies","time"]

interface RequestLoggerProps{
  ignore_urls : Array<string>
  parameters : Array<string>
  showLatestFirst : boolean
}

class RequestLogger{
  ignore_urls : Array<string>
  parameters : Array<string>
  showLatestFirst : boolean
  requests: Array<any> 
  constructor({ignore_urls, parameters, showLatestFirst} : RequestLoggerProps){
    // console.log(ignore_urls, parameters)
    this.ignore_urls = ignore_urls || []
    this.parameters = parameters || []
    this.showLatestFirst = showLatestFirst || false
    this.requests = []
  }
  Console(){
    return (req:any, _res:Response, next:NextFunction) => {
      // ignores the paths which are specified in the ignore_urls array
      if(!this.ignore_urls.includes(req.path)){
        const log:any = {}
        // creating the object using params
        this.parameters.forEach((prop : string) => {
          // @ts-ignore
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
        log["index"] = this.requests.length+1
        // push to the global array
        this.showLatestFirst ? this.requests.unshift(log) : this.requests.push(log)

        // columns for table
        // const columns = this.parameters.map((param) => ({ name : param}))

        // // table object
        // // @ts-ignore
        // const p = new Table({
        //   title:"Requests",
        //   columns,
        //   maxLen:5
        // });
      
        // // adding rows (this method is used to implement alternating colors)
        this.requests.forEach((req:any, _) => {
          // @ts-ignore
          req["class"] = CLASS[req.method] || 'default'
          // @ts-ignore
          // const color = colors[req.method] || 'white'
          // p.addRow(req, {color})
        })
        // // printing the table to console
        // p.printTable()
        console.table(this.requests)  
      }
      next()
    }
  }
  Webpage(){
    return (_ : Request, res:Response) => {
      res.render('index', {logs:this.requests, params: this.parameters});
    }
  }
};


export {RequestLogger}