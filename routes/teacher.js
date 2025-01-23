import express from "express";
import sendResponse from "../helpers/sendResponse.js";


const routes = express.Router()


routes.get("/" ,(req,res)=>{
    sendResponse(res , 200 , null , false ,"working on teacher routes")
})






export default routes