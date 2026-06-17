const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital');
const User = require('../models/user');
const fetchuser = require('../fetchUser');


// Fetching All Schedules

router.get("/",fetchuser, async (req,res) => { 
    try {
        const hospitals = await Hospital.find();
        res.json(hospitals);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Adding a Schedule

router.post("/",fetchuser, async (req,res) => { 
    
    try {
        const user = await User.findById(req.body.doctorId);
        if(!user){
            return  res.status(400).json({message: "Doctor not found"});
        }
        const hospital = new Hospital(req.body);
        await hospital.save();
        res.json(hospital);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Fetching Specific Doctor Schedules

router.get("/doctorAvailability",fetchuser, async (req,res) => {
    try {
        const schedules = await Hospital.find({doctorId: req.user.id});
        if(!req.user.id){
            return res.status(400).json({message: "Doctor ID is required"});
        }
        if(schedules.length === 0){
            return res.json([]);
        }
        res.json(schedules);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Updating a Schedule

router.put("/:id",fetchuser, async (req,res) => {
    try {
        const schedule = await Hospital.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!schedule){
            return res.status(404).json({message: "Schedule not found"});
        }
        res.json(schedule);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;