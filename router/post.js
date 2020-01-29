const express = require("express")
const auth = require('../middleware/auth');
const router = express.Router()
const upload = require('../controller/uploadfile');
const postController = require("../controller/PostsController")
router.post("/createpost",[upload],postController.addpost)
router.get("/findpost",postController.findpost)
router.get("/findpostById/:_id",postController.findpostById)

router.delete('/delete/:id',function(req,res){
    post.findByIdAndDelete(req.params.id).then(function(){

    }).catch(function(){
        res.send(e)
    })
});

module.exports = router