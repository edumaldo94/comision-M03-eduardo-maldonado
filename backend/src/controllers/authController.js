import  User  from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../middlewares/jwt.validator.js'
import { settingDotEnvSecret } from '../config/dotenv.js';
//registro de usuario
export const register= async(req,res)=>{
const {username,email,password} = req.body;

const userFound = await User.findOne({email})
if (userFound) {
    return res.status(400).json(["El Usuario ya existe"])
}

try {
    
    const passwordHash= await bcrypt.hash(password,10)
    const newUser= new User({
        username,
        email,
        password:passwordHash
    })

    const userSaved= await newUser.save();

const token= await createAccessToken({id: userSaved._id})
res.cookie('token', token);
res.json({
    message: "usuario registrado con éxito",
    id: userSaved.id,
    username: userSaved.username,
    email: userSaved.email
});

} catch (error) {
    res.status(500).json({message: 'Error al registrar el Usuario '+error})
}
};

//login de usuario

export const login= async(req,res)=>{

const {email, password} = req.body;

try {
    
const userFound= await User.findOne({email})
if(!userFound) return res.status(400).json(["Usuario no encontrado"])

const match = await bcrypt.compare(password, userFound.password)

if(!match) return res.status(400).json(["Contraseña Incorrecta"])

const token= await createAccessToken({id: userFound._id})
res.cookie('token', token);
res.json({
    message: "Bienvenido",
    username: userFound.username,
    email: userFound.email
});

} catch (error) {
    res.status(500).json({message: 'Error de login '+error})
}

};

//logout de usuario

export const logout= async(req,res)=>{

    res.cookie("token","", { expires: new Date(0) })
    return res.status(200).json({message: "Vuelva Pronto"})

};


export const profile= async(req,res)=>{

try {

    const userFound= await User.findById(req.user.id)
    console.log(userFound)
    if(!userFound) return res.status(400).json({message: "Usuario no encontrado!"})
    res.json({
        message: "Perfil",
        username: userFound.username,
        email: userFound.email
    });
} catch (error) {
    res.status(500).json({message: 'Error en el perfil '+error})
}

}

const {secret}=  settingDotEnvSecret()
export const verifyToken= async(req,res)=>{

    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "No autorizado" });
  
    jwt.verify(token, secret, async (err, user) => {
      if (err) return res.status(401).json({ message: "No autorizado" });
  
      const userFound = await User.findById(user.id);
      if (!userFound) return res.status(401).json({ message: "No autorizado" });
  
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
    
    }