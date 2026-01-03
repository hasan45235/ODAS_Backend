const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchuser = require('../fetchUser');

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/loginUser', async (req, res) => {
  try {
    res.send("LoginUser Endpoint is Working!");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/createUser', async (req, res) => {
  try {
    res.send("CreateUser Endpoint is Working!");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/createUser', async (req, res) => {
  try {

    let existingUser= await User.exists({email: req.body.email});
    if(existingUser){
      return res.status(400).json({error: "Sorry a user with this email already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hashPassword
    });
    
    const data = {
        user: {
            id: newUser.id
        }
    }
    const authToken = jwt.sign(data, process.env.JWT_SECRET)

    await newUser.save();
    res.json({ authToken , newUser});
  
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.post('/loginUser', async (req, res) => {
  
  const { email, password } = req.body;

  try {

    let existingUser = await User.findOne({email});
    if(!existingUser){
      return res.status(400).json({error: "User Not Found"})
    }

    const checkPass = await bcrypt.compare(password, existingUser.password);
    if(!checkPass){
      return res.status(400).json({error: "Invalid Credentials"})
    }

    
    const data = {
        user: {
            id: existingUser.id
        }
    }
    const authToken = jwt.sign(data, process.env.JWT_SECRET)

    res.json({ authToken , role:existingUser.role});
  
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/getAllUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/getUser', fetchuser, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
