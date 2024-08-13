module.exports = (req, res, next) => {
  console.log('reponse: ', res);
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  }
  res.status(401).send({ message: 'Unauthorized' }); // User is not authenticated, respond with 401 Unauthorized
};
