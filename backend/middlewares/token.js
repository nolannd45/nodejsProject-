
import jwt from "jsonwebtoken";

const token = async (req, res, next) => {
  var jwttest;
  console.log(req)
  try{
      var tok = req.headers.authorization
      jwttest = tok.split(' ')[1];
  }catch (error) {
    jwttest = req.cookies.token;
  }
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
  