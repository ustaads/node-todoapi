
var mongoose= require('mongoose');
var Users = mongoose.model('users',{
    email: {
        type: String,
        required: true,
        minlength: 11
    },
    name: {
        type: String
    }
});

module.exports = { Users};
