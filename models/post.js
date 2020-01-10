const mongoose = require('mongoose')
const post = mongoose.model('post', {    

    status: {
        type: String,
        require:true,
        trim: true
    },
    image: {
        type: String,
        require:true,
        trim: true
    },
    
    name:{
        type: String,
        require:true,
        trim: true
    }
    
    
  })

  module.exports = post