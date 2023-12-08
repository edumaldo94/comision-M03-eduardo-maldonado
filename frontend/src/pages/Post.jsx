
import NavbarPrivate from "../components/NavbarPrivate";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react"; // Importa useState
import { usePost } from "../context/PostContext";
import { PostCard } from "../components/PostCard";


export const Post = () => {
  const { user } = useAuth();

  const { getPostById } = usePost(); // No es necesario almacenar 'post' en una variable local

  const [resultArray, setResultArray] = useState([]); // Nuevo estado para almacenar los datos de 'resultArray'


  useEffect(() => {
 // signin(user)
 
    getPostById(user.id)
      .then((resultArray) => {
        
        setResultArray(resultArray); // Actualiza el estado con los datos obtenidos de 'resultArray'
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
      });
  }, [getPostById, user.id]); // Agrega las dependencias al arreglo de efectos

  if (!resultArray || resultArray.length === 0) {
    return (
      <>
        <NavbarPrivate />
        <h1>No Tiene Tareas</h1>
      </>
    );
  }

  return (
    <>
      <NavbarPrivate />
      <h1 className="text-5xl font-semibold text-white text-center w-full mt-4">Tus Post De Viajes</h1>
      <div className="flex grid justify-center">
        {resultArray.map((individualPost, i) => (
          <PostCard post={individualPost} key={i} />
        ))}
      </div>
    </>
  );
};
