const post = require("../models/post")

//function for adding post
exports. addpost =(req, res) => {
    
        console.log(req.body)
        console.log(req.files)
        req.files.map(function(items){
            const Post = new post({
                status:req.body.status,
                name:req.body.name,
                image:items.filename 
               
            }
            
            )
                Post.save().then(function( ){
                    res.send("post has been added")
                }).catch(function(e){
                    res.send(e)
                })

        })
        
    }

     
    //function for getting post
exports.findpost= async(req, res) => {
    console.log("sak");
   post.find().then(function(findAllpost) {
       
        res.send(findAllpost).catch(function(e){
            res.send(e)
        })
      })
  }
    //function for getting post by id
exports.findpostById= (req, res) => {
    post.findById(req.params._id)
    .then(function(postById) {
        res.send(postById).catch(function(e){
            res.send(e)
        })
      })
  }

  