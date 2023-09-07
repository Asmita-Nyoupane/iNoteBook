const express = require("express");
const User=require('../models/User');
const {body, validationResult } = require('express-validator');
const router =  express.Router();
//Create a User using:POST "/api/auth".Doesn't require Auth
router.post('/', [
 body('name').isLength({ min: 3 }).withMessage('Enter a name having atleast 3 letter'),
  body('email').isEmail().withMessage('Not a valid e-mail address'),
  body('password').isLength({ min: 5 }).withMessage('Password must have 5 character')

],
(req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    // res.send({ errors: result.array() });
    User.create({
        name: req.body.name,
        email:req.body.email,
        password: req.body.password
      }).then(user => res.json(user))
      .catch(err=>{ 
        console.log(err);
        res.json({error:'Please enter unique  email address ',message:err.message})
      });
    
})

module.exports=router;