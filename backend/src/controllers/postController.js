import Post from '../models/post.js';

// Lógica para obtener todos los posts
export const getPosts = async (req, res) => {
  
  try {
    const allPost= await Post.find().populate('author').populate('comments')
res.status(200).json(allPost)
  } catch (error) {
    return res.status(400).json({message:"error al buscar el POst "+ error})
  }


  
};

// Lógica para obtener un post por Id los posts
export const getPostsById = async (req, res) => {
  
  const {id} = req.params; // O el nombre que le hayas dado a tu parámetro de ruta
  try {
    const postsByUser = await Post.find({ author: id  }).populate('comments'); // Busca los posts cuyo campo 'author' coincida con userId
    res.status(200).json(postsByUser);
  } catch (error) {
    res.status(400).json({ message: "Error al buscar los posts del usuario: " + error });
  }
};
export const getPostsByIdPost = async (req, res) => {
  
  const id = req.params.id;
  try {
    const posts = await Post.findById(id); 
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: "Error al buscar los posts del usuario: " + error });
  }
};

 // Lógica para crear un nuevo post
export const createPost = async (req, res) => {
 
  const {title, description, createdAt,imageURL} =req.body

  try {
    
 const newPost= new Post({
  title, 
  description,
  author:req.user.id,
  //comments:req.comments.id, 
  createdAt,
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
 
  try {

    const updatePost= await Post.findByIdAndUpdate(req.params.id, req.body,  {new: true}).populate('author'); 

    if(!updatePost) return res.status(404).json({message: "Post no encontrado"})
    res.status(200).json(updatePost)
    } catch (error) {
      res.status(400).json({message: "Error al actualizar la tarea "+error})
  }


};

  // Lógica para eliminar un post existente
export const deletePost = async (req, res) => {
  const {id}= req.params
try {
  

  const deletePost= await Post.findByIdAndDelete(id); 

  if(!deletePost) return res.status(404).json({message: "Post no encontrado"})
  res.status(200).json({message:"Post eliminado"})
  } catch (error) {
    res.status(400).json({message: "Error al eliminar la tarea "+error})
}

};


