const post = require("../models/comment")
//function for comment on post
exports.addcomment =(req, res) => {
    
    console.log(req.body)
    console.log(req.files)
    req.files.map(function(items){
        const Post = new post({
            user_id:req.body.user_id,
            comment:req.body.comment,
            post_id:req.body.post_id 
           
        }
        
        )
            Post.save().then(function( ){
                res.send("comment has been added")
            }).catch(function(e){
                res.send(e)
            })

    })
    
}