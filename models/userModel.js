import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student",
  },
  std_id: {
    type: String,
  },
  teacher_id: {
    type: String,
  },
  age: {
    type: Number,  // Use Number for Mongoose
    required: true,
  },
  phoneNumber: {
    type: String,  // Keep as String if phone numbers are alphanumeric
    required: true,
  },
  marks: [
    {
      type: Number, // Use Number for marks
    }
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Course model
    ref: "Course", // Referencing the Course model
    required: false, // Optional if the student is not yet enrolled in a course
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const userModel = mongoose.model("Users", userSchema);

export default userModel;
