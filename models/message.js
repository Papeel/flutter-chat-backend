const { Schema, model, trusted } = require('mongoose');

const MessageSchema = Schema({
    from : {
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    to : {
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    message: {
        type: String,
        required: true
    }
    
},{
    timestamps: true
}
);


MessageSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    return object;
});

module.exports = model('Message', MessageSchema);