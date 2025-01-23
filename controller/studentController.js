import sendResponse from "../helpers/sendResponse.js";
import CourseModel from "../models/coursesModel.js";
import userModel from "../models/userModel.js";


//to get all students  and with query and aggregate 
export const getAllstudents = async (req, res) => {
    try {
      const { age, course, aboveThen } = req.query;
  
      // Base query ensuring role is "student"
      const query = { role: "student" };
  
      // Add conditions dynamically based on query parameters
      if (age) query.age = { $eq: parseInt(age) };
      if (course) query.course = { $eq: course }; // Ensure course matches
      if (aboveThen) query.age = { $gt: parseInt(aboveThen) }; // Age greater than aboveThen
  
      // Query the database
//       const studentdetails = await userModel.aggregate([
//         {
//           $match :query // await usermodel.find({query})
//         },
// //         {
// // $addFields:{
// //   totalResult :{$sum : "marks"} // means create a field named total result which will be the sume of the marks array
// // }



// //         },
// //         {
// //           $sort:{
// //             totalResult :-1 // means highest would be at top
// //           }
// //         },
//         {
//           $lookup:{
//             from : "courses",
//             foreignField : "_id",
//             localField :"course",
//             as : "courseDetails"

//           }
//         },
//         {
//           $unwind:{
//             path:"$courseDetails"
//           }
//         }
//       ])
  
      // // Extract only names and IDs for a cleaner response
      // const studentNames = studentdetails.map((student) => ({
      //   fullname: student.fullname,
      //   Student_id: student.std_id,
      //   age:student.age
      // }));
  
      // Send response
      // const studentdetails = await userModel.aggregate([{$match:query}])
      const studentdetails = await userModel.find(query).populate('course')
      sendResponse(
        res,
        200,
        { studentdetails },
        false,
        "Successfully fetched students"
      );
    } catch (error) {
      sendResponse(res, 500, null, true, error.message);
    }
  };
  


export const deleteStudent =async(req,res)=>{
 
    try {
        
        const deletedStudent  = await userModel.findOneAndDelete({std_id : req.params.id}) 
        if(!deletedStudent){
            return sendResponse(res , 404 ,null , true , "Student Not found")
        }    
        
        sendResponse(res, 200 , deletedStudent,false , "User Deleted Successfully")
    } catch (error) {
        sendResponse(res , 404 ,null , true , error.message)
        
    }

}


//enroll student into course or edit any other info abt status and result etc
export const enrollStudent = async(req,res)=>{
    try {
        

const findStudent = await userModel.findOne({std_id : req.params.id})
if(!findStudent){
    return sendResponse(res,404 , null , false , "student not found " )

}

if(findStudent.course){
    return sendResponse(res, 400 , null , false , "student already enrolled " )
}


// find the course from course model 
const findCourse = await CourseModel.findOne({courseNumber:req.body.course_id})

if (findCourse.students.includes(findStudent._id)) {
    return sendResponse(res,400 , true, null , "Student is already enrolled in this course")
      
  }

if(!findCourse){
    return sendResponse(res,404 , null , false , "course not found " )
}




findStudent.course = findCourse._id
findCourse.students.push(findStudent._id)
await findCourse.save()
await findStudent.save()

const studentwithCourse = await userModel.findOne({std_id : req.params.id}).populate("course")

sendResponse(res , 201 , studentwithCourse , false , "Student enrolled succesfuly")
        
    } catch (error) {
         sendResponse(res , 400 ,null , true  ,error.message)
        
    }



}


//edit student info 
export const editStudent=async(req,res)=>{
    try {
        // Find student by std_id and update their details
        const findStudent = await userModel.findOneAndUpdate(
          { std_id: req.params.id },  // Corrected `req.params.id`
          req.body,                    // Update payload
          { new: true, runValidators: true, strict: false }  // Options to return the updated document
        );
    
        // Check if the student was found and updated
        if (!findStudent) {
          return sendResponse(res, 404, null, true, "Student not found");
        }
    
        // Send the updated student document
        sendResponse(res, 200, findStudent, false, "Student updated successfully");
      } catch (error) {
        // Handle any errors
        sendResponse(res, 400, null, true, error.message);
      }
}







//add krni he field
//field ko remove krna he
//keys ko update krna he
//data ke behalf pe koi calculation krwani he
//data ko group krna he

// AGGREGATION