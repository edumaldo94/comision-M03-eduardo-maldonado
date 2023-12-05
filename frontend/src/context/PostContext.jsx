import { createContext, useContext, useState } from "react";
import { createPostReq, deletePostReq, getPostByIdReq, getPostReq, updatePostReq } from "../api/postAxios";

const PostContext= createContext()

export const usePost=()=>{
    const context= useContext(PostContext);
    if(!context) throw new Error("Error en el contexto de las tareas")
    return context;
}


export const PostProvider= ({children})=>{

const [post, setPost]= useState([])

const createPost= async(post)=>{
    //console.log(post)
const res= await createPostReq(post)

}

const getAllPost = async () => {
    const res = await getPostReq();
    // console.log(res);
    try {
        setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

 //3) Eliminar
 const deletePost = async (id) => {
    try {
      const res = await deletePostReq(id);
      // console.log(res);
      if (res.status === 200) setPost(post.filter((post) => post._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

 //4) Buscar por Id
 const getPostById = async (id) => {
  console.log("bbb "+id)
    try {
      const res = await getPostByIdReq(id);
      // console.log(res);
      //retornamos para que lo pueda ver en el taskFormPage
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  //5) Actualizar
  const updatePost = async (id, post) => {
    try {
      const res = await updatePostReq(id, post);
    } catch (error) {
      console.log(error);
    }
  };
return(

    <PostContext.Provider value={{
        createPost,
        getAllPost,
        deletePost,
        getPostById,
        updatePost,
        post

    }}>

        {children}
    </PostContext.Provider>
)

}