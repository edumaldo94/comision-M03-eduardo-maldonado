import {useForm} from "react-hook-form"

import { useAuth } from "../context/AuthContext"
import {registerReq} from "../api/auth"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import { useEffect } from "react"
export const Register = ()=>{

const {register, handleSubmit, formState:{errors}} = useForm()


const {signup,isAuth, errors:registerErrors }=useAuth()

const navigate= useNavigate()
useEffect(()=>{
    if(isAuth) navigate("/post")


},[isAuth])

const onSubmit = handleSubmit(async(values)=>{
    //console.log(values)

    signup(values)
})
    return(
        <div className="flex h-screen items-center justify-center">
<div className="bg-zinc-900 max-w-md p-8 rounded-md">

        <form action="">
            <h1 className="text-3xl text-center font-semibold mb-5">Register</h1>
            {registerErrors.map((err,i)=>(
    <div key={i} className="bg-red-800 text-white">{err}</div>
))}
            <input className="w-full bg-zinc-700 text-white px4 py-2 rounded-md my-2"  type="text" placeholder="Username"
            {...register("username", {required:true})}/>
{errors.username && (
    <p className="bg-red-800 text-white">Username es requerido</p>
)}
            <input className="w-full bg-zinc-700 text-white px4 py-2 rounded-md my-2" type="email" placeholder="Email"
            {...register("email", {required:true})}/>
{errors.email && (
    <p className="bg-red-800 text-white">Email es requerido</p>
)}
            <input className="w-full bg-zinc-700 text-white px4 py-2 rounded-md my-2" type="password" placeholder="Password"
            {...register("password", {required:true})} />
{errors.password && (
    <p className="bg-red-800 text-white">Password es requerido</p>
)}
            <button onClick={onSubmit} className="h-10 px-6 font-semibold rounded-md bg-blue-500 text-white my-3">Registrarse</button>
        
        </form>
        <p className="flex justify-between mt-5">Tienes una cuenta? <Link to="/login" 
        className="px-3 font-semibold rounded-md bg-green-500 text-white">Loguearse</Link></p>
        </div>
        </div>
    ) 
}