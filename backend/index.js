const express = require('express');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
require('./public/config/passport-setup');
const keys = require('./public/config/keys');
const authRoutes = require('./public/routes/auth-routes');
const cors = require('cors');
const requireAuth = require('./public/middleware/requireAuth');
require('dotenv').config();

const app = express();

// Enable CORS for frontend
app.use(
  cors({
    origin: [keys.frontend.url],
    methods: ['POST', 'GET'],
    credentials: true,
  })
);

const { getDatabase } = require('./public/config/database'); // Import the database functions

// Replace cookieSession with express-session
app.use(
  session({
    secret: keys.session.cookieKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: keys.mongodb.dbURI,
      autoRemove: 'native', // Automatically remove expired sessions
    }),
    cookie: {
      secure: true, // Ensure secure cookies in production
      httpOnly: true, // Helps mitigate XSS attacks
      sameSite: 'lax', // Helps protect against CSRF attacks
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Import routes
const pageLinksRoutes = require('./public/routes/page-links-routes');
const publicUserRoutes = require('./public/routes/public-user-routes');
const userRoutes = require('./public/routes/user-routes');

// Middleware to check database connection for each request
app.use((req, res, next) => {
  try {
    getDatabase(); // Ensure the database connection is established
    next();
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send('Database connection error');
  }
});

app.get('/', (req, res) => {
  res.send('Hello from the serverless function!');
});

// Define global public routes (no authentication required)
app.use('/api', pageLinksRoutes, publicUserRoutes);

// Use authRoutes for authentication
app.use('/api', authRoutes);

// Middleware for authentication
app.use('/api', requireAuth);

// Define private routes (authentication required)
app.use('/api', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('An error occurred:', err.message);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

module.exports = app;
