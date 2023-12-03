import axios from "axios"

const API= "http://localhost:3000"



export const registerReq = (user)=> axios.post(`${API}/register`, user)
export const loginReq = (user)=> axios.post(`${API}/login`, user)
export const homeReq = (user)=> axios.post(`${API}/`, user)