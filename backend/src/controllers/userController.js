
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Controlador para registrar un usuario
exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Verificar si el usuario o el correo ya existen en la base de datos
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario o correo ya existen' });
    }

    // Encriptar la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

// Controlador para iniciar sesión
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Crear un token de autenticación
    const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Controlador para obtener información de un usuario por ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener información del usuario' });
  }
};

// Otros controladores para actualizar usuario, eliminar usuario, etc.
