const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;


// Route 1. Create a User using:POST "/api/auth/createUser".No login required
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
let success =false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //generate the salt and added  password to generate hashed password
    const salt = await bcrypt.genSalt(10);
    scecuredPassword = await bcrypt.hash(req.body.password, salt);

    // check whether the user with email already exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, errors: "Sorry a user with this email alreasy exists" });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: scecuredPassword,
      });
      //generating payload to send with token
      const data = {
        user: {
          id: user.id,
        },
      };
      // generating authentication token
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error occurred");
    }
  }
);

// Route 2. Authenticate a User using:POST "/api/auth/loginUser".No login required
router.post(
  "/loginUser",
  [
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password").exists().withMessage("Password can't be blank"),
  ],
  async (req, res) => {
    let success = false
    // If there are errors, return bad request and the error

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    // check whether the user with email already exist
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({  success,error: "Please try to login with correct credential" });
      }
      //check whether the user enter password and stored password match or not
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success,error: "Please try to login with correct credential" });
      }
      //generating payload to send with token
      const data = {
        user: {
          id: user.id,
        }
      };
      //generating authentication token
      const authToken = jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({ success,authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error occurred");
    }
  }
);
// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post(
  "/getuser",fetchuser,
  async (req, res) => {
    try {
       let userId=req.user.id;
      const user= await User.findById(userId).select("-password");
      res.send(user);
      
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;
