const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// @desc Register a User
// @route POST /api/user/register
// @access public
const registerUser = asyncHandler(async (req,res) => {
    const {username,email,password} = req.body;
    if(!(username && email && password))
    {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable)
    {
        res.status(400);
        throw new Error("Email already registered!");       
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hasedPassword is: ",hashedPassword);

    // creating a user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created ${user}`);    

    if(user)
    {
        res.status(201).json({_id: user.id, email: user.email});
    }
    else{
        res.status(400);
        throw new Error("Invalid user creation!");
    }

    res.json({
        message: "Registered the User"
    });
});
// @desc Login a User
// @route POST /api/user/login
// @access public
const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    if(!(email && password))
    {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password)))
    {
        const accessToken = jwt.sign({
            user: {
                username: user.name,
                email: user.email,
                id: user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:'15m'
        })
        res.status(200).json({ accessToken });
    }
    else
    {
        res.status(401)
        throw new Error('Email or Password is incorrect')
    }
});
// @desc Get current user info
// @route GET /api/user/current
// @access private
const currentUser = asyncHandler(async (req,res) => {
    res.json(req.user); 
});

module.exports = {registerUser,loginUser, currentUser};