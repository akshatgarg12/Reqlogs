import express , {Request, Response} from 'express'
import path from "path";
const app = express()
import cors from 'cors'
const PORT = process.env.PORT || 8080
import {RequestLogger} from './middleware/request'

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+'src'+ '/public'))
app.set( "views", path.join( __dirname, "views" ) );
app.set('view engine','ejs');

// logs the request data to console in table form
const RL = new RequestLogger({ignore_urls : ['/logs'],parameters:["index","path","method","query","body","time"], showLatestFirst : true})
app.use(RL.Console())
app.use('/logs',RL.Webpage())

app.get('/' , (_req:Request, res:Response) : void => {
  res.send("hello world")
})
app.post('/' , (_req:Request, res:Response) : void  => {
  res.send("hello world")
})

app.listen(PORT, () : void => {
  console.log(`Server started at port : ${PORT}`)
})