const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please add the user name"],
    },
    email: {
        type: String,
        required: [true,"Please add the user email address"],
        unique: [true,"Email Address already exists"],
    },
    password:{
        type:String,
        required: [true,"Please add a password"],
    },
},
{
    timestamps: true,  // Saves createdAt and updatedAt as dates. Creates
});

module.exports = mongoose.model("User",userSchema);
