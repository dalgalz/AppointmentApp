// require mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;
// create the schema
const appointmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true 
  },
  appointDateTime: {
  	type: Date,
  	required: true,
  	trim: true
  },
  complain: {
    type: String,
    required: true,
    minlength: 10,
    trim: true
  }},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Appointment', appointmentSchema);