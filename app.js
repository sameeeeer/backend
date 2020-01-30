const express = require('express')
const app = express();
require('./database/mongoose')
const taskrouter = require('./router/user')
const commentrouter = require('./router/comment')
const post = require('./router/post')
const path = require("path");
const bodyParser = require('body-parser');
const publicdirectory= path.join(__dirname,'public');
const cors = require('cors');
const auth = require('./middleware/auth')
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(publicdirectory));
app.use(express.json())
app.use(taskrouter)
app.use(post)


app.use(taskrouter)
app.listen("3000");