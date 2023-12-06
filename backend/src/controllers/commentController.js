import Comment from'../models/comment.js';
import Post from '../models/post.js';

  // Lógica para crear un nuevo comentario
export const createComment = async (req, res) => {

  const {description} =req.body
  const postId = req.params.postId;
  try {
    
 const newComment= new Comment({

  description,
  author:req.user.id,

 })

 const commentSaved= await newComment.save();
 // Agregar el ID del nuevo comentario al post correspondiente
 const post = await Post.findById(postId);
 if (!post) {
   return res.status(404).json({ message: 'Post no encontrado' });
 }

 // Agregar la ID del nuevo comentario a la lista de comentarios del post
 post.comments.push(newComment._id);
 await post.save();

 res.status(200).json(commentSaved)

  } catch (error) {
   return res.status(400).json({message:"error al guardar el commentario "+ error})
  }

};


// Lógica para eliminar un comentario existente
export const deleteComment = async (req, res) => {
  const id= req.params.id
 // Obtener el ID del comentario a eliminar

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    res.status(200).json({ message: 'Comentario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el comentario' });
  }
};


 // Lógica para obtener todos los comentarios de un post específico, por ejemplo
export const getComments = async (req, res) => {
 
  const id= req.params.id

  try {
    
  const commentFound= await Comment.find({id});
  
  if(!commentFound) return res.status(404).json({message: "Comentario no encontrado"})
  res.status(200).json(commentFound)
  } catch (error) {
    res.status(400).json({message: "Error al buscar  el Comentario "+error})
  }

};
export const getAllComments = async (req, res) => {
 

  try {
    
  const commentFound= await Comment.find();
  
  if(!commentFound) return res.status(404).json({message: "Comentario no encontrado"})
  res.status(200).json(commentFound)
  } catch (error) {
    res.status(400).json({message: "Error al buscar  el Comentario "+error})
  }

};
