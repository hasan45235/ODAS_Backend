const mongoose = require('mongoose');
const { Schema } = mongoose;
    
const Hospital = new Schema({
  hospitalName: {type:String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fees: { type: String, required: true },
  days: {type:Array, required: true},
  startTime: { type:String, required: true  },
  endTime: { type:String, required: true  },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  slotDuration: { type: String, required: true },
  date: { type: Date, default: Date.now },
},{ timestamps: true });

module.exports = mongoose.model('Hospital', Hospital);