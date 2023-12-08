import NavbarPrivate from "../components/NavbarPrivate"
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';



export const Profile= ()=>{
  
    const { user, perfilComent, updatePerfil } = useAuth();
    const [formData, setFormData] = useState({
        username: (user && user.username) || '',
  email: (user && user.email) || '',
    });
  
    useEffect(() => {
      // Lógica para cargar los datos del usuario cuando el componente se monta
      setFormData({
        username: user.username || '',
        email: user.email || '',
        // Agrega más campos si es necesario
      });
    }, [user]);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await updatePerfil(user.id, formData);
          // Actualizar los datos del usuario después de la modificación
          const updatedUser = await perfilComent(user.id);
          // Puedes actualizar el estado del usuario aquí si es necesario
        } catch (error) {
          console.error('Error al actualizar el perfil:', error);
        }
      };
    
    return(
        <>
        <NavbarPrivate/>
        <div className="flex grid justify-center">
        <h1>Profile Page</h1>
          <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md ">
      <h1>User Profile</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        {/* Agrega más campos para editar */}
        <button type="submit" className="bg-green-500 rounded mt-2">Guardar cambios</button>
      </form>
    </div>
  
  </div>
        </>
 )
}