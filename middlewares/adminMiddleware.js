const protectAdmin = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
  
  module.exports = protectAdmin;
  