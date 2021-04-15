import express, {Request, Response, NextFunction, Router} from 'express'
import cors from 'cors'
import path from "path";
import {RequestLoggerProps, BOOTSTRAP_CLASSES}  from './types'



// 1. ignore_urls should support regex
// 2. parameters must be pre-defined


const defaultParameters = {
  path : true,
  method : true,
}
class RequestLogger{
  app : any
  ignore_urls : Array<string>
  parameters : Array<string>
  showLatestFirst : boolean
  requests: Array<any> 
  constructor({ignore_urls, parameters=defaultParameters, showLatestFirst=true} : RequestLoggerProps){
    this.app = express()

    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended:true}))

    this.app.use(express.static(__dirname+'src'+ '/public'))
    this.app.set( "views", path.join( __dirname, "views" ) );
    this.app.set('view engine','ejs');
   
    this.ignore_urls = ignore_urls || []
    // @ts-ignore
    this.parameters = Object.keys(parameters).filter(p => parameters[p]) || []
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
            if (req[prop]){
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
        // push to the global array
        this.showLatestFirst ? this.requests.unshift(log) : this.requests.push(log)
        this.requests.forEach((req:any, _) => {
          // @ts-ignore
          req["class"] = BOOTSTRAP_CLASSES[req.method] || 'default'
        })
        console.log("REQUESTS RECEIVED")
        console.table(this.requests, this.parameters)  
      }
      next()
    }
  }
  Webpage(){
    // middleware setup
    this.app.get('/logs' , (_ : Request, res:Response) => {
      res.render('index', {logs:this.requests, params: this.parameters});
    })
    return this.app
  }
};


export {RequestLogger}