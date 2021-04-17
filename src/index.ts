// import express , {Request, Response} from 'express'
// const app = express()
// const PORT = process.env.PORT || 8080
// import {RequestLogger} from './request'

// // logs the request data to console in table form
// const RL = new RequestLogger({ignore_urls : ['/logs'],showLatestFirst : false})
// app.use(RL.Console())
// app.use(RL.Webpage({url : '/logs'}))

// app.all('/' , (req:Request, res:Response) : void => {
//   res.send("Hello world")
// })

// app.listen(PORT, () : void => {
//   console.log(`Server started at port : ${PORT}`)
// })
// Copy all the view templates

import {RequestLogger} from './request'

export {RequestLogger}
