const comment = require("../models/comment")
//function for comment on post
exports.addcomment =(req, res) => {

    console.log(req.body.user_id)
    var mydata = new comment(req.body);
        // const Comment = new comment({
        //     user_id:req.body.user_id,
        //     comment:req.body.comment,
        //     post_id:req.body.post_id 
        // }
        // )
        mydata.save().then(function( ){
                res.send("comment has been added")
            }).catch(function(e){
                res.send(e)
            })
    
}
exports.getCommentByPostId =(req, res) => {
    comment.find({post_id:req.params.id}).populate('user_id').populate('post_id').then(function(findAllcomment) {
        res.send(findAllcomment).catch(function(e){
            res.json(e)
        })
      })
}

