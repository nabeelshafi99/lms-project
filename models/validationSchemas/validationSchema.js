
import Joi from "joi";


// for joi




// AUTH SCHEMA

//VALIDATION SCHEMA FOR REGISTRATION
export const  registerSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().required(),
  phoneNumber: Joi.string().required(),
});


//VALIDATION SCHEMA FOR LOGIN

export const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required()
})


export const updatePasswordschema = Joi.object({
    
    password: Joi.string().min(6).required()
})





// COURSE SCHEMA 


//VALIDATION SCHEMA FOR COURSES
export const courseSchema = Joi.object({
    title: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.min": "Title must be at least 6 characters long.",
        "any.required": "Title is required.",
      }),
  
    description: Joi.string()
      .min(3)
      .max(500) // Extended to accommodate longer descriptions
      .required()
      .messages({
        "string.min": "Description must be at least 3 characters long.",
        "string.max": "Description cannot exceed 500 characters.",
        "any.required": "Description is required.",
      }),
  
    duration: Joi.string()
      .min(3)
      .max(30)
      .required()
      .messages({
        "string.min": "Duration must be at least 3 characters long.",
        "string.max": "Duration cannot exceed 30 characters.",
        "any.required": "Duration is required.",
      }),
  
    status: Joi.string()
      .valid("ongoing", "pending", "completed")
      .lowercase()
      .required()
      .messages({
        "any.only": "Status must be one of 'ongoing', 'pending', or 'completed'.",
        "any.required": "Status is required.",
      }),
    
  });
 export const updateCourseSchema = Joi.object({
    title: Joi.string()
      .min(6)
      .messages({
        "string.min": "Title must be at least 6 characters long.",
        "any.required": "Title is required.",
      }),
  
    description: Joi.string()
      .min(3)
      .max(500) // Extended to accommodate longer descriptions
      .messages({
        "string.min": "Description must be at least 3 characters long.",
        "string.max": "Description cannot exceed 500 characters.",
        "any.required": "Description is required.",
      }),
  
    duration: Joi.string()
      .min(3)
      .max(30)
      .messages({
        "string.min": "Duration must be at least 3 characters long.",
        "string.max": "Duration cannot exceed 30 characters.",
        "any.required": "Duration is required.",
      }),
  
    status: Joi.string()
      .valid("ongoing", "pending", "completed")
      .lowercase()
      .messages({
        "any.only": "Status must be one of 'ongoing', 'pending', or 'completed'.",
        "any.required": "Status is required.",
      }),
    days: Joi.string()
      .valid("MWT", "TTS", "SS")
      .lowercase()
      .messages({
        "any.only": "Days must be one of 'MWT' (Monday-Wednesday-Thursday), 'TTS' (Tuesday-Thursday-Saturday), or 'SS' (Saturday-Sunday).",
        "any.required": "The 'days' field is required.",
      }),
  });
  
