const express = require('express')
require('./database/mongoose')
const taskrouter = require('./router/user')
const bodyParser = require('body-parser');




const app = express()
app.use(bodyParser.urlencoded({extended:false}))



app.use(express.json())
app.use(taskrouter)
//app.use(taskrouter)
app.listen(3000);