import { usePost } from "../context/PostContext";
import { Link } from "react-router-dom";

export const PostCard = ({ post }) => {
 
  const { deletePost } = usePost();
  //   console.log(task);
  return (
    
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
      <div className="text-center w-full"> {/* Añade esta div con la clase text-center */}
        <h1 className="text-2xl font-semibold text-white">{post.title}</h1>
      </div>
      </header>
       {post.imageURL && ( // Verifica si hay una URL de imagen definida en post.imageURL
      <img src={post.imageURL} alt="Imagen" className="w-full mt-4" />
    )}

    <p className="">{post.description}</p>

    <p className="text-2xl font-bold">
      {post.createdAt ? new Date(post.createdAt).toLocaleDateString():"Fecha inválida"}
      </p>
      
  <div className="flex gap-x-2 items-center">
          <button onClick={() => { deletePost(post._id);}}   
          className="bg-red-500 hover:bg-blue-600 text-white font-semibold py-1 px-1 rounded"> Eliminar </button>
          <Link to={`/post/${post._id}`}
            className="bg-gray-500 hover:bg-blue-600 text-white font-semibold py-1 px-1 rounded">Editar</Link>
        </div>

    </div>
  );
};