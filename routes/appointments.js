const express = require('express');
const router = express.Router();
const Hospital = require('../models/AvailableDoctors');
const fetchuser = require('../fetchUser');
const User = require('../models/User');
const Appointments = require('../models/Appointments');


router.get('/', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = await User.findById(userId);
        const appointments = await Appointments.find()
        res.json(appointments);
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})

router.get('/fetchDocSpecificAppointments',fetchuser, async (req, res)=>{
    try {
        const userId = req.user.id;
        const userData = await User.findById(userId);
        if(userData.role !== 'doctor'){
            return res.status(401).send("Access denied");
        }
        const appointments = await Appointments.find({doctorId: userId});
        res.json(appointments);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})

router.get('/fetchPatSpecApp',fetchuser, async (req, res)=>{
    try {
        const userId = req.user.id;
        const userData = await User.findById(userId);
        if(userData.role !== 'patient'){
            return res.status(401).send("Access denied");
        }
        const appointments = await Appointments.find({patientId: userId});
        res.json(appointments);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})
router.post('/',fetchuser, async (req, res) => {
    try {
        const user = req.user.id;
        const userData = await User.findById(user);
        if(userData.role !== 'patient'){
            return res.status(401).send("Access denied");
        }
        const newAppointment = new Appointments({
            ...req.body,
            patientId: userData._id
        })
        const savedAppointment = await newAppointment.save();
        res.json(savedAppointment);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})

router.put('/:id',fetchuser,async(req, res)=>{
    try {
        const user = req.user.id;
        const userData = await User.findById(user);
        if(userData.role !== 'doctor'){
            return res.status(401).send("Access denied");
        }
        const crrntApp = await Appointments.findById(req.params.id);
        if(!crrntApp || crrntApp.doctorId.toString() !== userData._id.toString()){
            return res.status(404).send("Appointment not found");
        }
        const { status } = req.body;
        const appointment = await Appointments.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(appointment);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})
module.exports = router;