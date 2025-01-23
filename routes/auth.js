import jwt from "jsonwebtoken";
import 'dotenv/config'
import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { authenticateAdmin, authenticateUser } from "../middleware/authentication.js";
import { loginSchema, registerSchema, updatePasswordschema } from "../models/validationSchemas/validationSchema.js";
import { loginUser, registerUser, myInfo, updatePassword } from "../controller/authController.js";

const routes = express.Router()







//get req to check 
routes.get("/", (req, res) => {
    sendResponse(res, 200, null, false, "working on get api")
})






//registering user on mongodb 
routes.post("/register", registerUser)

// logging in user 
routes.post("/login" , loginUser)



routes.get("/myinfo" , authenticateUser, myInfo)



routes.put("/forgetpassword" , authenticateUser , updatePassword)





export default routes