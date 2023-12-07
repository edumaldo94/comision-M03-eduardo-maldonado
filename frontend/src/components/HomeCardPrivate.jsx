import { usePost } from "../context/PostContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useComments } from "../context/CommentsContext";
export const HomeCardPrivate = ({ post }) => {

  const { deletePost } = usePost();
  const{ perfilComent }= useAuth()
  const{ createComment }= useComments()
  const [commentAuthors, setCommentAuthors] = useState([]);
  useEffect(() => {
    const fetchCommentAuthors = async () => {
      const authors = [];
      for (const comment of post.comments) {
        try {
          const author = await perfilComent(comment.author);
          authors.push(author);
        } catch (error) {
          console.error("Error al obtener el autor del comentario:", error);
          authors.push(null); // Manejo del error, agregar un valor por defecto
        }
      }
      setCommentAuthors(authors);
    };

    fetchCommentAuthors();
  }, [perfilComent, post.comments]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = async () => {
    // Lógica para enviar el comentario usando la función createComment del CommentsProvider
    try {
      // Llama a la función createComment con el ID del post y el nuevo comentario
      await createComment(post._id, { description: newComment });
      // Puedes actualizar el estado local con el nuevo comentario si es necesario
      // setComments([...comments, newComment]);
      setNewComment(''); // Limpia el campo del comentario después de enviarlo
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }
  };
  //   console.log(task);
  return (
     
    <div className="flex flex-col bg-zinc-800 max-w-md w-full p-10 rounded-md mt-4" >
      <header className="flex justify-between">
      <div>
        
        <h1 className="text-2xl font-semibold text-white"> @{post.author.username} </h1>
      </div>
    
      </header>
        <div className="text-center w-full"> {/* Añade esta div con la clase text-center */}
        <h1 className="text-2xl font-semibold text-white">{post.title}</h1>

      </div> 
      <p className="">{post.description}</p>
       {post.imageURL && ( // Verifica si hay una URL de imagen definida en post.imageURL
      <img src={post.imageURL} alt="Imagen" className="w-full mt-4 h-full w-full object-cover" />
    )}
 <p className="text-2xm font-bold"> Fecha:  
      {post.createdAt ? new Date(post.createdAt).toLocaleDateString():"Fecha inválida"}
      </p>
<div className="bg-zinc-700 max-w-md w-full p-5 rounded-md mt-4">
        <h2>Comentarios:</h2>
        <ul>
          <div className="bg-yellow-700 max-w-md w-full p-5 rounded-md mt-4">
          {commentAuthors.map((author, index) => (
            <li key={post.comments[index]._id}>
              <div className="bg-zinc-900 rounded-md  mt-2">
               <p>@{author ? author.username : "Desconocido"}</p>
              <p>Comentario: {post.comments[index].description}</p>
             </div>
              {/* Otras partes del comentario */}
            </li>
            
          ))}
          </div>
        </ul>
       
      </div>
      <div className="bg-zinc-700 max-w-md w-full p-5 rounded-md mt-4">
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Escribe tu comentario"
        className="custom-input"
      />
      <button
        className="bg-green-500 hover:bg-blue-600 text-white font-semibold py-1 px-1 rounded mt-2"
        onClick={handleCommentSubmit}
      >
        Comentar
      </button>
    </div>

    </div>
    


  );
};