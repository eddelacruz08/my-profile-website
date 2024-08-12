const express = require('express');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('./public/config/passport-setup');
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

// Replace cookieSession with express-session
app.use(
  session({
    secret: keys.session.cookieKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: keys.mongodb.dbURI }),
    cookie: {
      secure: true,
      httpOnly: true, // Helps mitigate XSS attacks
      sameSite: 'lax', // Helps protect against CSRF attacks }, // Set to true if using HTTPS
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB using mongoose
mongoose
  .connect(keys.mongodb.dbURI)
  .then(() => {
    console.log('Connected to MongoDB via Mongoose');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB via Mongoose', err);
    process.exit(1); // Exit the process if the connection fails
  });

// Import routes
const pageLinksRoutes = require('./public/routes/page-links-routes');
const publicUserRoutes = require('./public/routes/public-user-routes');
const userRoutes = require('./public/routes/user-routes');

app.get('/', (req, res) => {
  res.send('Hello from the serverless function!');
});

// Define global public routes (no authentication required)
app.use('/api', pageLinksRoutes);
app.use('/api', publicUserRoutes);

// Use authRoutes for authentication
app.use('/api', authRoutes);

// Middleware for authentication
app.use('/api', requireAuth);

// Define private routes (authentication required)
app.use('/api', userRoutes);

// Prevent caching of authenticated pages
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

module.exports = app;
