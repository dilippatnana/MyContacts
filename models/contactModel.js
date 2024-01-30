const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    },
    name:{
        type:String,
        required:[true,"Please provide your name"],
    },
    email:{
        type: String,
        unique: true,
        required:[true,"Please provide your email"],
    },
    phone:{
        type:Number,
        required:[true,"Please provide your phone number"],
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("Contact",contactSchema);