const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const savepost = new mongoose.Schema({ 

    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    post_id: {
        type: Schema.Types.ObjectId,
        ref: 'post',
    }
    
  })
  const Savepost = mongoose.model('Savepost',savepost)

  module.exports = Savepost