const express = require('express')
require('./database/mongoose')
const taskrouter = require('./router/user')
const post = require('./router/post')
const path = require("path");
const bodyParser = require('body-parser');
const publicdirectory= path.join(__dirname,'public');




const app = express()
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(publicdirectory));

app.use(express.json())
app.use(taskrouter)
app.use(post)
//app.use(taskrouter)
app.listen("3000");