import { Schema, model } from 'mongoose';
const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  imageURL: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
  // Otros campos o validaciones que necesites para el modelo de post
},{
    timestamps:true,
    versionKey:false
  });
const Post = model('Post', postSchema);

export default Post;
