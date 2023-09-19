const express= require('express');

const router= express.Router();
const User= require('../models/User');
const { body, validationResult } = require('express-validator');  //Importing Express validator
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');    //Helps to verify the user. It has three parts: Header, Payload and signature
const jwtsignature= 'NijanshuToken';

const fetchUser= require('../Middleware/fetchUser');

//  Route 1: Create a new user|| No login required
router.post('/createuser',[
    body('name','Enter valid Name').isLength({min:3}),         //Conditions needed for data
    body('email').isEmail(),
    body('password').isLength({min:5}), //Conditions needed for data
],async (req, res) =>{
    let success= false;

    //If errors are encountered, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array()});
    }
    //Check whether the user with same email already exists
    try{
    let user=await User.findOne({ email: req.body.email }); //Finds any other user with same email
    if(user) {
        return res.status(400).json({success, err: "Sorry, user with same email already exists"})
    }
    const salt= await bcrypt.genSalt(10);   //   to generate a new salt
    const secPass = await bcrypt.hash(req.body.password, salt);  // adds salt to password
    user= await User.create({  //Creates New User
        name: req.body.name,
        email: req.body.email,
        password: secPass   //Stores salted password
    } )
    // }).then(user => res.json(user))
    // .catch(err=>{console.log(err)         //Stores in Database
    // res.json({error:"Please Enter Unique Email", message: err.message})})     
   const data={
    user:{
        id: user.id,    //id is always unique
    }
   }
   
    const authToken= jwt.sign(data, jwtsignature);      //Token Used to verify user
   
success= true;
   res.json({success, authToken});      // responds with token: if someone sign up or if someone tries to manipulate the payload data, a new token will be generated and we can be alert 
}catch(err){console.log(err.message);
    res.status(500).send("Something went wrong")}
})

// Route 2: Authenticate a user for login using: POST "/api/auth/login" || Login Endpoint. No login required
router.post('/login',[
    body('email').isEmail(),
    body('password','Password can\'t be blank').exists(),
],async (req, res) =>{
    let success= false;
    //If errors are encountered, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
}

    const{email, password}=req.body;
    try {
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({ error:"Invalid Email or Password"});
        }
            
        const passCompare= await bcrypt.compare(password, user.password);
            if(!passCompare) {
               
                return res.status(400).json({success, error:"Invalid Email or Password"});
            }
            const payload= { 
                user:{
                    id: user.id,
                }
        }
        const authToken= jwt.sign(payload, jwtsignature);     
        success= true;
        res.json({success, authToken}); 
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Something went wrong/ Internal Server Error")    }
})

//  Route 3: Get user data in user profile using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchUser, async (req, res) =>{
try {
    const userId=req.user.id;
    const user= await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
    console.log(err.message);
        res.status(500).send("Something went wrong/ Internal Server Error")   
     }
    });


module.exports= router;
