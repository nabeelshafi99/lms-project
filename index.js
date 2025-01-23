// express installed 
//nodemon 
//morgan 
//dotenv
//mongoose 
//jwt
//joi
//bcryt
import express from "express"
import 'dotenv/config'
import morgan from "morgan"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js"
import courseRoutes from "./routes/courses.js"
import studentRoutes from "./routes/student.js"
import teacherRoutes from "./routes/teacher.js"


const app = express()
const PORT = process.env.PORT || 4000
//mongo db connection 
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("mongodb connected");
    
    
}).catch((err)=>{
    console.log("error" , err);
    
})


//middlewares
app.use(morgan('tiny'))
app.use(express.json())
// auth routes 
app.use("/auth" , authRoutes)
// courses routes 
app.use("/course" , courseRoutes)
//students routes
app.use("/students" ,studentRoutes)
//teacher routes
app.use("/teachers" , teacherRoutes)



app.get("/" , (req,res)=>{
    res.status(200).send("working on get req")
})

app.post("/" , (req,res)=>{
    const{email} = req.body
    res.status(201).send({data : email , msg : "Working on post api "})
})



app.listen(PORT , ()=>{
    console.log("running on port ");
    
})