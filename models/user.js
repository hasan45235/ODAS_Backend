const mongoose = require('mongoose');
const { Schema }  = mongoose;

const User = new Schema({
  receiptNum:{type:String, required: true},
  name: {type:String, required: true },
  email: { type: String , required: true, unique: true },
  password: { type: String, required: true },
  age: {type:Number, required: true},
  contact: { type:String, required: true  },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  address:{ type: String, required: true },
  role: { type: String, enum: ['patient', 'admin', 'doctor'], default: 'patient' },
  speciality: { type: String }, 
  experience: { type: String },
  fee: { type: String },
  qualification: { type: String },
  bio: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  date: { type: Date, default: Date.now },
},{ timestamps: true });

module.exports = mongoose.model('User', User);