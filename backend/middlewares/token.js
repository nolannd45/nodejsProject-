
import jwt from "jsonwebtoken";



const token = async (req, res, next) => {

  
  const jwttest = req.headers.authorization.split(' ')[1];
  console.log(jwttest)
  if (!jwttest) {
      return res.status(401).send('Accès non autorisé');
    }
    try {
      const decoded = await jwt.verify(jwttest, 'config');
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      res.status(400).send('Jeton non valide');
    }
  };
  
  export default token;