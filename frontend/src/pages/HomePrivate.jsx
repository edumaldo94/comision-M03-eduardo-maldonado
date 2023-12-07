import NavbarPrivate from "../components/NavbarPrivate"

import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { usePost } from "../context/PostContext";
import { HomeCardPrivate } from "../components/HomeCardPrivate";




export const HomePrivate= ()=>{


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
          <NavbarPrivate/>
        <h1 className="text-5xl font-semibold text-white text-center w-full mt-4">Viajes De la Comunidad</h1>
        <div className="grid grid-cols-3 gap-2">
        {post.map((post, i) => (
          <HomeCardPrivate post={post} key={i} />
        ))}
      </div>


        </>
    )
}
