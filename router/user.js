const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth');
const upload = require('../controller/uploadfile');


router.post('/register', (req, response) => { // /registraion url path (req)-> api ma aaeko req | (response)-> action
    console.log(req.body); // shows the parameters that the user sends from body 
    var mydata = new User(req.body); //sends the req from client to our model user
    mydata.save().then(function() { //mydata.save initialies the data sending process though the model
        response.send(mydata); //client gets the response

    }).catch(function(e) { //if data is not saved catch triggers the reason why
        response.send(e);
    })
})

router.post("/login", async function(req, res){

    const user = await User.checkCrediantialsDb(req.body.email,
   req.body.password)
    const token = await  user.generateAuthToken()
    res.json({
        token:token,    
        success:true,
        user:user
    });
    console.log("   success")
   
   })


//   router.post('/login', async function(req, response) {
//     console.log(req.body);
//     var email = req.body.email;
//     var password = req.body.password;

//     User.findOne({ 'email': email, 'password': password }).count(function(err, number) {
//         if (number != 0) {
//             response.statusCode = 200;
//             response.setHeader('Content-Type', 'application/json') //what format the response is being sent in
//             response.json('Successfully Logged in');

//         } else {
//             res.send('email and password did not match');
//             console.log('email and password did not match')
//         }
//     })
// })
//get ko lagi code
router.get('/urs', auth, function (req, res) {
    User.find().then(function (user_data) {
        res.send(user_data);


    }).catch(function (e) {

        res.json(e)

    });
})

router.get('/profile/:_id', (req, res) => {
    User.findById(req.params._id
    ).then(function(userdetail){
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
    User.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
        res.send("updated")
    }).catch(function (e) {
        res.send(e)
    })
})

router.get('/test_student', auth, function (req, res) {
    user_type = req.user_type
    //console.log(user_type)
    if (user_type == "student") {
        res.send("Welcome student")
    }
    else {
        res.status(401).send({ error: 'Please authenticate.' })
    }

})

router.put("/users/:id/photo/upload", upload, auth, (req,res) => {
    req.files.map(function(img){
        var image = img.filename

        User.findByIdAndUpdate(req.params.id, {'image': image},{upsert: true},(err, docs) =>{
            if(err){
                return res
                .status(500)
                .send({error: "unsuccessful"})
            }else {
                console.log(image)
                res.send("Profile Picture Update successfull !"+docs)
            }
        })
    })
})
router.get("/admin_dashboard", auth, function (req, res) {
    user_type = req.user_type
    if (user_type == "admin") {
        res.send("hello admin")
    }
    else {
        res.send("please authenticate..");
    }
})

module.exports = router