const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String, 
            unique:true,
            required: true, 
            trim:true,
        },
        email: {
            type: String,
            unique:true, 
            required:true,
            match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Please add a valid email address']
            // figure out how to validate email adress.  
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId, 
                ref:'User',
            },
        ]

    },
    {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    }
)

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

const User = model('User', userSchema);


module.exports = User;