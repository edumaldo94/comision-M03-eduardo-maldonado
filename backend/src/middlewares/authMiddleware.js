/*import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado, se requiere token' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, 'secreto');

    // Agregar el ID del usuario decodificado al objeto de solicitud para su uso posterior
    req.userId = decoded.userId;
    next(); // Permitir continuar con la solicitud si el token es válido
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default authMiddleware;
*/