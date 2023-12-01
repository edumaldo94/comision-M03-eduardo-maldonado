import { Schema, model } from 'mongoose';
const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  }
  // Otros campos o validaciones que necesites para el modelo de comentario
},{
  timestamps:true,
  versionKey:false
});

const Comment = model('Comment', commentSchema);

export default Comment;
