import NavbarPrivate from "../components/NavbarPrivate"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { usePost } from "../context/PostContext";
import { PostCard } from "../components/PostCard";

export const Post= ()=>{
  const { user } = useAuth();

  const { getAllPost, post } = usePost();

  //useEffect para traer las tareas cuando se ejecuta esta pagina
  useEffect(() => {
    getAllPost();
  }, []);

  if (post.length === 0)
    return (
      <>
        <NavbarPrivate />
        <h1>No Tiene Tareas</h1>
      </>
    );

    return(
        <>
          <NavbarPrivate />
          
        <h1>Post Page</h1>

       { /*{JSON.stringify(user,null, 3)}*/}
       <div className="grid grid-cols-3 gap-2">
        {post.map((post, i) => (
          <PostCard post={post} key={i} />
        ))}
      </div>
        </>
    )
}