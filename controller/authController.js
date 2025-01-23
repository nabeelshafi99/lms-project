import jwt from "jsonwebtoken";
import sendResponse from "../helpers/sendResponse.js";
import userModel from "../models/userModel.js";
import { loginSchema, registerSchema, updatePasswordschema } from "../models/validationSchemas/validationSchema.js";
import bcrypt from 'bcrypt'



// TO REGISTER USER DEFAULT ROLE IS STUDENT 
export const registerUser = async(req,res)=>{
    try {
        
        const { error, value } = registerSchema.validate(req.body);
        if (error) return sendResponse(res, 400, null, true, error?.details[0]?.message)

    const searchedUser = await userModel.findOne({ email: value.email })
    
    if (searchedUser) return sendResponse(res, 401, null, true, "User already registered with this email ")
        
const hashedPassword = await bcrypt.hash(value.password, 12)

value.password = hashedPassword
//to auto generate id 
const allStudents = await userModel.find({role:"student"})

value.std_id = allStudents.length+1


let newUser = new userModel({...value})
newUser = await newUser.save()



sendResponse(res , 201 , newUser , false , "user Created succesfully")

} catch (error) {
 sendResponse(res , 500 , null , error.message)
    
}

}




//FOR LOGGING IN USER THRU TOKEN  (jwt)

export const loginUser =async (req,res) =>{
    const {error , value} = loginSchema.validate(req.body);

if(error) return sendResponse(res , 400 , null ,true , error?.details[0]?.message)

    const LoggedinUser = await userModel.findOne({email : value.email}).lean() 

    // for plain javascript object we use lean which will help us in sending token

    if(!LoggedinUser) return sendResponse(res , 404 , null ,true , "Invalid Email ")

        const validPass =await bcrypt.compare(value.password , LoggedinUser.password)
         if(!validPass) return sendResponse(res , 404 , null ,true , "Invalid Password ")
    
            delete LoggedinUser.password
            
const token = jwt.sign(LoggedinUser , process.env.AUTH_SECRET)

sendResponse(res , 201 , {token , LoggedinUser} , false , "User Logged in Successfully")

}


//TO GET INFO 
export const myInfo = async(req,res)=>{
    const findUser = await userModel.findById({_id : req.user._id})
sendResponse(res , 201 , findUser , false , "Found data")
}


//UPDATE PASSWORD

export const updatePassword = async(req,res) =>{
    const {error,value} = updatePasswordschema.validate(req.body)
if(error) return sendResponse(res, 400 , null ,true ,error?.details[0]?.message)

const hashedPassword = await bcrypt.hash(value.password ,12)
value.password = hashedPassword


const findUser =await userModel.findOneAndUpdate({_id : req.user._id} , {$set:value} , {new:true})

if(!findUser) return sendResponse(res,404 , null ,true , "user Not Found")
sendResponse(res,201,findUser, false , "Password Updated Successfully")
}