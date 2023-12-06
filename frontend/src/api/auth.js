import axios from "./setCredentials"




export const registerReq = (user)=> axios.post(`/register`, user)
export const loginReq = (user)=> axios.post(`/login`, user)

export const verifyToken= ()=> axios.get("/verifyToken")
export const profileReq= ()=> axios.get("/profile")
export const perfilComentReq= (id)=> axios.get(`/profileComent/${id}`)