const mongoose = require('mongoose');
const { Schema } = mongoose;
    
const Appointment = new Schema({
  receiptnum:{type:String, required: true},
  hospitalId: {type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fees: { type: String, required: true },
  appointmentDate: { type:String, required: true  },
  appointmentTime: { type:String, required: true  },
  status: { type: String, enum: ['pending', 'approved','completed','rejected'], default: 'pending' },
  date: { type: Date, default: Date.now },
},{ timestamps: true });

module.exports = mongoose.model('Appointment', Appointment);