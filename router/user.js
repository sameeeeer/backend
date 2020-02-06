const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth');
const upload = require('../controller/uploadfile');


router.post('/register', (req, response) => { // /registraion url path (req)-> api ma aaeko req | (response)-> action
    console.log(req.body); // shows the parameters that the user sends from body 
    var mydata = new User(req.body); //sends the req from client to our model user
    mydata.save().then(function () { //mydata.save initialies the data sending process though the model
        response.send(mydata); //client gets the response

    }).catch(function (e) { //if data is not saved catch triggers the reason why
        response.send(e);
    })
})

router.post("/login", async function (req, res) {

    const user = await User.checkCrediantialsDb(req.body.email,
        req.body.password);
        console.log(user)
        if(user!=null){
    const token = await user.generateAuthToken()
    res.json({
        token: token,
        success: true,
        user: user
    });
    console.log("success")
}
else{
    res.json({
        success:false
    })
}
})
router.get("/logincheck",auth,async(req,res)=>{
    res.send(req.user)
    console.log(req.user)
})

//get ko lagi code
router.get('/urs', function (req, res) {
    User.find().then(function (user_data) {
        res.send(user_data);
    }).catch(function (e) {
        res.send(e)
    });
})

router.get('/profile/:_id', (req, res) => {
    User.findById(req.params._id
    ).then(function (userdetail) {
        res.send(userdetail)
    })
});
//yaha sama  get ko code 


//yaha bata taltira delete ko 
router.delete('/del/:id', function (req, res) {
    User.findByIdAndDelete(req.params.id).then(function () {

    }).catch(function () {
        res.send(e)
    })
});

router.put('/updates/:id', function (req, res) {
    console.log(req.body)
    User.findByIdAndUpdate(req.params.id, req.body).then(function () {
        res.send("updated")
    }).catch(function (e) {
        res.send(e)
    })
})
router.post('/logout',auth , async(req,res)=> {
    try{
        req.user.tokens = res.user.tokens.filter((token)=>{
        return token.token !== req.token
    })
    await req.user.save()
    res.send()
}
catch (e) {
    res.status(500).send
}
});



router.put("/upload/:id",[upload], function(req,res){

        req.files.map(function (img) {
            var image = img.filename

            User.findByIdAndUpdate(req.params.id, { 'file': image }, { upsert: true }, (err, docs) => {
                if (err) {
                    return res
                        .status(500)
                        .send({ error: "unsuccessful" })
                } else {
                    console.log(image)
                    res.send("Profile Picture Update successfull !" + docs)
                }
            })
        })
    }
)


module.exports = router