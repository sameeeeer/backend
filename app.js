const express = require('express')
const app = express();
require('./database/mongoose')
const taskrouter = require('./router/userRouter')
const commentrouter = require('./router/comment')
const post = require('./router/post')
const path = require("path");
const bodyParser = require('body-parser');
const publicdirectory= path.join(__dirname,'public');
const cors = require('cors');
const auth = require('./middleware/auth')
const savepost = require('./router/savepost')
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(publicdirectory));
app.use(express.json())
app.use(taskrouter)
app.use(post)
app.use(savepost)


// app.get('/logout',auth,(req,res)=>{
//     req.user.deleteToken(req.token,(err,user)=>{
//         if(err) return res.status(400).send(err);
//         res.sendStatus(200)
//     })
// })

app.use(taskrouter)
app.listen("3000");
console.log('Server runs at http://localhost:' + 3000);