
var mongoose= require('mongoose');

var Todos = mongoose.model('Todos',{
    
    text: {
        type: String,
        required: true, // required validation
        minLength : 1,
        trim: true // remove white spaces
    },
    completed :{ 
        type: Boolean,
        default: false
    }
    ,
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todos};