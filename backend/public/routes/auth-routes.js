const router = require('express').Router();
const passport = require('passport');
require('dotenv').config();

// Auth logout
router.get('/auth/logout', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect(process.env.FRONTEND_URL_ORIGIN + '/login');
  }

  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send({ message: 'Logout failed' });
    }
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Session destruction error:', err);
          return res.status(500).send({ message: 'Session destruction failed' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.redirect(process.env.FRONTEND_URL_ORIGIN + '/login');
      });
    } else {
      res.clearCookie('connect.sid');
      res.redirect(process.env.FRONTEND_URL_ORIGIN + '/login');
    }
  });
});

// Auth with Google
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

// Callback route for Google to redirect to after login
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: process.env.FRONTEND_URL_ORIGIN + '/login' }),
  (req, res) => {
    // Redirect to frontend after successful authentication
    res.redirect(process.env.FRONTEND_URL_ORIGIN + '/profile');
  }
);

module.exports = router;
