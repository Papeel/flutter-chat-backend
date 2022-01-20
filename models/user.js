const { Schema, model, trusted } = require('mongoose');

const UserSchema = Schema({
    name : {
        type: String,
        require: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    online: {
        type: Boolean,
        default: false,
    }
});


UserSchema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('User', UserSchema);