import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true  
  },

  email: {
    type: String,
    required: true,
    unique: true  
  },
  password: {
    type: String,
    required: true
  },
  avatarURL: String,
  // Otros campos o validaciones que necesites para el modelo de usuario
},{
  timestamps:true,
  versionKey:false
});

const User = model('User', userSchema);

export default User;
