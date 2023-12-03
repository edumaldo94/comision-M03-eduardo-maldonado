import { BrowserRouter as Router,Routes, Route } from "react-router-dom"
import { Register } from "./pages/register"
import { AuthProvider } from "./context/AuthContext"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { Post } from "./pages/Post"
import { Profile } from "./pages/Profile"

export const App= ()=>{

  return (
    <AuthProvider>
 <Router>

  <Routes>
  
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/post" element={<Post/>}/>
    <Route path="/profile" element={<Profile/>}/>
 

  </Routes>

 </Router>
 </AuthProvider>
 )
}