import NavbarPublic from "../components/NavbarPublic"

import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { usePost } from "../context/PostContext";
import { PostCard } from "../components/PostCard";




export const Home= ()=>{


  const { user } = useAuth();


  const { getAllPost, post } = usePost();


  //useEffect para traer las tareas cuando se ejecuta esta pagina
  useEffect(() => {
    getAllPost();
  }, []);


  if (post.length === 0)
    return (
      <>
        <NavbarPublic />
        <h1>No Tiene Tareas</h1>
      </>
    );




    return(
        <>
          <NavbarPublic/>
        <h1>Home Page</h1>
        <div className="grid grid-cols-3 gap-2">
        {post.map((post, i) => (
          <PostCard post={post} key={i} />
        ))}
      </div>


        </>
    )
}
