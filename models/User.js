const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    email:{
        type: String,
        required : true,
        unique: true,
    },
    password:{
        type: String,
        unique: true,
    },
    selectedTopics : {
        type:[String],
        default: []
    }
})

const User = mongoose.model('User',UserSchema);
module.exports = User;