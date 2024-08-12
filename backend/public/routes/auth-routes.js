const router = require('express').Router();
const passport = require('passport');
require('dotenv').config();

// auth logout
router.get('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send({ message: 'Logout failed' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send({ message: 'Session destruction failed' });
      }
      res.clearCookie('connect.sid');
      res.redirect(process.env.FRONTEND_URL_ORIGIN + '/login');
    });
  });
});

// auth with google
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  // Redirect to frontend after successful authentication
  res.redirect(process.env.FRONTEND_URL_ORIGIN + '/profile');
});

module.exports = router;
