import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import CourseModel from "../models/coursesModel.js";
import { authenticateAdmin } from "../middleware/authentication.js";
import { courseSchema } from "../models/validationSchemas/validationSchema.js";
import { createCourse, deleteCourse, getAllcourse, getSingleCourse, updateCourse } from "../controller/courseController.js";

const routes = express.Router()







routes.get("/", getAllcourse)



routes.post("/create-course", authenticateAdmin,createCourse)



routes.put("/updatecourse/:id", authenticateAdmin, updateCourse)


routes.delete("/deletecourse/:id" , authenticateAdmin,deleteCourse)
routes.get("/singlecourse/:id" , getSingleCourse)

export default routes