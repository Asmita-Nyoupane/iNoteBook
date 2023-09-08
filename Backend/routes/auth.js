const express = require("express");
const User = require("../models/User");
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const JWT_SERECT="JayNepal$7890";
//Create a User using:POST "/api/auth/createUser".No login required
router.post(
  "/createUser",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Enter a name having atleast 3 letter"),
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must have 5 character"),
  ],
  async (req, res) => {
    // If there are errors, return bad request and the error
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //generate the salt and added  password to generate hashed password
    const salt= await bcrypt.genSalt(10);
     scecuredPassword= await bcrypt.hash(req.body.password,salt);

// check whether the user with email already exist
try{
     let user= await User.findOne({email:req.body.email});
     if(user){
      return res.status(400).json({errors:"Sorry a user with this email already exist"});
     }
     user= await User.create({
      name: req.body.name,
      email: req.body.email,
      password: scecuredPassword,
    });
    const data={
      user:{
        id:user.id
      }
    }
     const authToken = jwt.sign(data,JWT_SERECT);
     console.log(authToken);
      res.json({authToken});
  }
  catch(error){
    console.log(error.message);
    res.status(500).send("Some Error occurred");
  }
  }
);

module.exports = router;
