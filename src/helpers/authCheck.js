const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    token = token.replace(/^Bearer\s+/, '');
    const { JWT_SECRET } = process.env;
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};
