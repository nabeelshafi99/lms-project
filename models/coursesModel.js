import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    title: {
      type: String, // Use `String`, not `string` from Joi
      required: true,
    },
    description: {
      type: String, // Use `String`
      required: true,
    },
    duration: {
      type: String, // Use `String`
      required: true,
    },
    status: {
      type: String, // Use `String`
      enum: ["ongoing", "pending", "completed"], // Valid statuses
      default: "pending",
    },
    // days: {
    //   type: String, // Use `String`
    //   enum: ["MWT", "TTS", "SS"], // Valid day combinations
    //   default: "TTS",
    //   required: true,
    // },
    courseNumber :{
      type : String ,
    },
    
    students: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to the 'Users' model
        ref: "Users", // Refers to the Users schema
      },],
      teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        
      },
      assignments: [
        {

          type : String, 
        }
          
      ]

  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const CourseModel = mongoose.model("Course", courseSchema);

export default CourseModel;
