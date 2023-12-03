import {body, validationResult} from 'express-validator'

export const validateRegister = [
body("username")
.isLength({min: 4})
.withMessage("El Usuario debe tener al menos 4 caracteres"),


body("email")
.isEmail()
.withMessage("ingrese un email válido")
.notEmpty()
.withMessage("Email no debe estar vacío"),

body("password")
.notEmpty()
.isLength({min: 3})
.withMessage("El password debe tener al menos 3 caracteres"),

 ];



 export const validateLogin = [

  body("email")
  .isEmail()
  .withMessage("ingrese un email válido")
  .notEmpty()
  .withMessage("Email no debe estar vacío"),
  
  body("password")
  .isLength({min: 3})
  .withMessage("El password debe tener al menos 3 caracteres"),
  
   ];

   //validacion de error

   export const handleErrorValidations = (req,res,next)=>{
    const error= validationResult(req)

    if(!error.isEmpty()){
      return res.status(400).json([error.errors[0].msg])

     // return res.status(400).json({message:"Error en la validación de atributos ",error})
    }
    next()
   }