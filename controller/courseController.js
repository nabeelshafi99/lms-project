import sendResponse from "../helpers/sendResponse.js";
import CourseModel from "../models/coursesModel.js";
import { courseSchema, updateCourseSchema } from "../models/validationSchemas/validationSchema.js";



export const getAllcourse = async (req, res) => {

  const allCourses = await CourseModel.find().populate("students")
  console.log("all courses", allCourses.length);

  sendResponse(res, 200, allCourses, false, "working on course routes")
}



// CREATE COURSE 
export const createCourse = async (req, res) => {
  const { error, value } = courseSchema.validate(req.body);
  if (error) return sendResponse(res, 400, null, true, error?.details[0]?.message)
  // console.log("value => " , value);

  const checkCourse = await CourseModel.findOne({ days: value.days })
  if (checkCourse) return sendResponse(res, 401, null, true, "already have that course on the same day ")


  //this will find all the courses and add automatically course number on its own 
  const allcourses = await CourseModel.find()
  value.courseNumber = allcourses.length + 1

  console.log("value =>", value);

  let newCourse = new CourseModel({ ...value })
  newCourse = await newCourse.save()


  sendResponse(res, 200, newCourse, false, "course Created Successfully")




}


//UPDATE COURSE
export const updateCourse = async (req, res) => {
  try {

    const { error, value } = updateCourseSchema.validate(req.body)

    if (error) return sendResponse(res, 404, null, true, error?.details[0]?.message)

    const findCourse = await CourseModel.findOneAndUpdate({ courseNumber: req.params.id }, { $set: value }, { new: true })
    // for immediate response we use new :true and $set will find the values and keys and update it acc to them or we can use , value directly but this is more efficient way to do it 
    if (!findCourse) return sendResponse(res, 404, null, true, "Course not found ")
    sendResponse(res, 201, findCourse, false, "course Updated Successfully")

  } catch (error) {
    return sendResponse(res, 304, null, true, error.message)
  }


}

//delete course
export const deleteCourse = async (req, res) => {

  try {

    const deletedCourse = await CourseModel.findOneAndDelete({ courseNumber: req.params.id })
    if (!deletedCourse) {
      return sendResponse(res, 404, null, true, "Course Not found")
    }

    sendResponse(res, 200, deletedCourse, false, "Course Deleted Successfully")
  } catch (error) {
    sendResponse(res, 404, null, true, error.message)

  }

}

export const getSingleCourse = async (req, res) => {
  const getCourse = await CourseModel.findOne({ courseNumber: req.params.id })
  sendResponse(res, 200, getCourse, false, "working on single course")



}
