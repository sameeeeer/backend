const express = require("express")
const auth = require('../middleware/auth');
const router = express.Router()
const upload = require('../controller/uploadfile');
const postController = require("../controller/PostsController")
router.post("/createpost",[upload],postController.addpost)
router.get("/findpost",postController.findpost)
router.get("/findpostById/:_id",postController.findpostById)

//router to get post added by a user
router.get('/users/:id/myposts', auth, (req, res) => {
    var id = req.params.id  
    post.find({'user_id': id}).then(function(result){
        res.send(result)
    }).catch(function(e){
        res.send(e)
    })
})
module.exports = router