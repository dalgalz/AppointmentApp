// require mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;
// create the schema
const userSchema = new Schema({
  username: {
  	type: String,
  	required: true,
  	minlength: 3,
    unique: true,
  	trim: true
  },
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
	password_hash: { type: String, required: true, minlength: 3},
  appointments:[{ type: Schema.Types.ObjectId, ref: 'Appointment' }]},
  {timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema);