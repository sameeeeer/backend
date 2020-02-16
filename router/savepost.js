const express = require('express')
const ModelSave = require('../models/savepost')
const bodyParser = require('body-parser')
const router = new express.Router()
const auth = require('../middleware/auth')
const post = require('../models/post')
const user = require('../models/user')


router.use(bodyParser.urlencoded({extended: false}));

router.post('/savepost', (req,res)=>{
    console.log(req.body);
    const data = new ModelSave(req.body);
    data.save().then(function(){
        res.send("post has been Saved");
    }).catch(function(e){
        res.send(e)
    })
})

//get saved rent
router.get('/getsavedpost/:id', (req,res) => {
    var id = req.params.id
    ModelSave.find({user_id: id}).populate('post_id').populate('user_id').then(function(result){
        res.send(result)
    }).catch(function(e){
        res.send(e)
    })
})

module.exports = router