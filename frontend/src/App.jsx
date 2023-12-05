import { BrowserRouter as Router,Routes, Route } from "react-router-dom"
import { Register } from "./pages/register"
import { AuthProvider } from "./context/AuthContext"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { Post } from "./pages/Post"
import { Profile } from "./pages/Profile"
import { PrivateRoutes } from "./routes/PrivateRoutes"
import { PostForm } from "./pages/PostForm"
import { PostProvider } from "./context/PostContext"


export const App= ()=>{

  return (
    <AuthProvider>
      <PostProvider>

 <Router>
  <Routes>

    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>

    <Route element={<PrivateRoutes/>}>

    <Route path="/post" element={<Post/>}/>
    <Route path="/add-post" element={<PostForm/>}/>
    <Route path="/post/:id" element={<PostForm/>}/>
    <Route path="/profile" element={<Profile/>}/>
 
    </Route>

  </Routes>
 </Router>
 
 </PostProvider>
 </AuthProvider>
 )
}