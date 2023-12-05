import NavbarPrivate from "../components/NavbarPrivate";
import {useForm} from "react-hook-form"
import { usePost } from "../context/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
export const PostForm= ()=>{


 const{register, handleSubmit, setValue}= useForm()

const {createPost, getAllPost, deletePost, getPostById, updatePost }= usePost()

const params = useParams();
useEffect(() => {
  // console.log(params);
  async function loadPost() {
    if (params.id) {
      const post = await getPostById(params.id);
      //el setValue del useForm
      setValue("title", post.title);
      setValue("description", post.description);
    }
  }
  loadPost();
}, []);

const navigate = useNavigate();


 const onSubmit= handleSubmit((data)=>{

    //createPost(data)

    if (params.id) {
      updatePost(params.id, data);
    } else {
      createPost(data);
    }
    navigate("/post");
 })
    return (
       
    <>
    <NavbarPrivate/>
    <h1>Post Form</h1>
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md"> 
    <form onSubmit={onSubmit}>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="text"
            placeholder="Titulo"
            {...register("title")}
            autoFocus
          />
          <textarea
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            rows="3"
            placeholder="Descripción"
            {...register("description")}
          ></textarea>

          <label>Completado</label>
          <input type="checkbox" {...register("completed")} />
          <button
            className="flex h-10 px-6 font-semibold rounded-md bg-green-900 text-white my-5"
            type="submit"
          >
            Guardar
          </button>
        </form>

        </div>
</>
)
}