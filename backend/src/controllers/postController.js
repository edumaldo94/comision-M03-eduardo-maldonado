import Post from '../models/post.js';

// Lógica para obtener todos los posts
export const getPosts = async (req, res) => {
  
  try {
    const allPost= await Post.find({
  author: req.user.id
}).populate('author')
res.status(200).json(allPost)
  } catch (error) {
    return res.status(400).json({message:"error al buscar el POst "+ error})
  }

};

// Lógica para obtener un post por Id los posts
export const getPostsById = async (req, res) => {
  
const {id}= req.params

try {
  
const postFound= await Post.findById(id);

if(!postFound) return res.status(404).json({message: "Post no encontrado"})
res.status(200).json(postFound)
} catch (error) {
  res.status(400).json({message: "Error al buscar la tarea "+error})
}

};

 // Lógica para crear un nuevo post
export const createPost = async (req, res) => {
 
  const {title, description, imageURL} =req.body

  try {
    
 const newPost= new Post({
  title, 
  description,
  author:req.user.id,
  //comments:req.comments.id, 
  imageURL
  
 })

 const postSaved= await newPost.save();
 res.status(200).json(postSaved)

  } catch (error) {
   return res.status(400).json({message:"error al guardar POst "+ error})
  }

};

 // Lógica para Actualizar un post existente
export const updatePost = async (req, res) => {
  const {id}= req.params
  try {

    const updatePost= await Post.findByIdAndUpdate(id, req.body, {new: true}).populate('author'); 

    if(!updatePost) return res.status(404).json({message: "Post no encontrado"})
    res.status(200).json(updatePost)
    } catch (error) {
      res.status(400).json({message: "Error al actualizar la tarea "+error})
  }


};

  // Lógica para eliminar un post existente
export const deletePost = async (req, res) => {

try {
  

  const deletePost= await Post.findByIdAndUpdate(id, req.body, {new: true}).populate('author'); 

  if(!deletePost) return res.status(404).json({message: "Post no encontrado"})
  res.status(200).json({message:"Post eliminado"})
  } catch (error) {
    res.status(400).json({message: "Error al eliminar la tarea "+error})
}

};


