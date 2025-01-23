

import express from "express";
import { deleteStudent,editStudent, enrollStudent, getAllstudents } from "../controller/studentController.js";
import { authenticateAdmin } from "../middleware/authentication.js";

const routes = express.Router()




//to get all students 
routes.get("/" , getAllstudents )


//enroll student into course or edit any other info abt status and result etc
routes.put("/editStudent/:id" ,authenticateAdmin, editStudent)

//to enroll student and add that student into course if he/she isnt in course yet 
routes.put("/enrollstudent/:id" , authenticateAdmin,enrollStudent)



// to delete student 
routes.delete("/removeStudent/:id" ,authenticateAdmin, deleteStudent)







export default routes