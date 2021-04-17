// import express , {Request, Response} from 'express'
// const app = express()
// const PORT = process.env.PORT || 8080
// import {RequestLogger} from './request'
// import cors from 'cors'

// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

// const parameters = {
//   time: true,
//   method: true,
//   path : true,
//   query : true,
//   body : true 
// }
// // an array of paths you want the logger to ignore
// const ignore_urls = ['/a', '/b'] 
// // logs the request data to console in table form
// const RL = new RequestLogger({ignore_urls,parameters,showLatestFirst : false})


// const router = express.Router()

// router.all('/', (req:Request, res:Response) : void => {
//   res.send("Hello world")
// })

// router.all('/another',(req:Request, res:Response) : void => {
//   res.send("Hello world")
// })

// app.use(RL.Console())
// app.use(RL.Webpage({url : '/logs'}))

// app.use(router);

// app.listen(PORT, () : void => {
//   console.log(`Server started at port : ${PORT}`)
// })
// Copy all the view templates

import {RequestLogger} from './request'

export {RequestLogger}
