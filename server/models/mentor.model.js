import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({

  name: { type: String, required: true },

  designation: { type: String, required: true },

  email: { type: String, required: true, unique: true },
  
  assignedStudents: [{ type: String,  unique: true }],

  position:{type:String},
  
  response :[{
    student_id :{type:String},
    assesment:{type:Object}
  }]
});

export default mongoose.model('Mentor', mentorSchema);
