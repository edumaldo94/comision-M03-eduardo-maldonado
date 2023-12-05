import { useState, useEffect } from 'react';
import { usePost } from '../context/PostContext';
import { useComments } from '../context/CommentsContext';
import { Link } from 'react-router-dom';

export const HomeCard = ({ post }) => {
  const { deletePost } = usePost();
  const { getAllComments, comments } = useComments();
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    // Cuando el componente se monta, obtén los comentarios para este post específico
    if (post._id) {
      getAllComments(post._id); // Suponiendo que se pueda obtener el _id del post para buscar comentarios
    }
  }, [getAllComments, post._id]);

  useEffect(() => {
    // Actualiza los comentarios del post cuando comments (del contexto) cambie
    setPostComments(comments);
  }, [comments]);

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <div className="text-center w-full">
          <h1 className="text-2xl font-semibold text-white">{post.title}</h1>
        </div>
      </header>
      {post.imageURL && (
        <img src={post.imageURL} alt="Imagen" className="w-full mt-4" />
      )}
      <p className="">{post.description}</p>
      <p className="text-2xl font-bold">
        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Fecha inválida'}
      </p>

      <div>
        <h3>Comentarios:</h3>
        {postComments.map((comment, index) => (
          <div key={index}>
            <p>{comment.description}</p>
            {/* Agrega cualquier otra información del comentario que desees mostrar */}
          </div>
        ))}
      </div>

      {/* Resto de tu código */}
    </div>
  );
};
