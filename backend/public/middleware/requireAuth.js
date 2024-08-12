module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware or route handler
    }
    res.status(401).send({ message: 'Unauthorized' }); // User is not authenticated, respond with 401 Unauthorized
};