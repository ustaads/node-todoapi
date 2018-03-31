
const validator = require('validator');
const mongoose= require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 11,
        trim: true,
        unique: true,
        validate:{

            // or we can simply do this
            // validator: validator.isEmail
            validator: (value)=>{
                return validator.isEmail(value)
            },
            message: '{VALUE} is Not a Valid Email'
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true

        },
        token: {
            type: String,
            required: true
        }
    }]
});



UserSchema.methods.toJSON = function (){

    var user = this;
    var userObject = user.toObject();
    

    return _.pick(userObject,['_id', 'email']);
};


//Generating an Instance Method-- every single user have its own different Method-- Thats why this keyword is used
UserSchema.methods.generateAuthToken = function (){

    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(),access},'abc123').toString();

    user.tokens = user.tokens.concat([{access,token}]); 

    return user.save().then(()=>{
        return token;
    });
}

UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;

    try{

        decoded= jwt.verify(token,'abc123');
    }
    catch(e){

        // return new Promise((res, rej)=>{
        //     reject();
        // });

        return Promise.reject();
    }

    return User.findOne({

        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access':'auth'
    });
};

var User = mongoose.model('users',UserSchema);

module.exports = { User};
