import { BrowserRouter as Router,Routes, Route } from "react-router-dom"
import { Register } from "./pages/register"
import { AuthProvider } from "./context/AuthContext"



export const App= ()=>{

  return (
    <AuthProvider>
 <Router>

  <Routes>
  
    <Route path="/" element={<h1>Home</h1>}/>
    <Route path="/login" element={<h1>Login</h1>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/profile" element={<h1>Profile</h1>}/>
    <Route path="/" element={<h1></h1>}/>

  </Routes>

 </Router>
 </AuthProvider>
 )
}