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
// app.use(
//   cors({
//     origin: keys.frontend.url,
//     credentials: true,
//   })
// );

// Replace cookieSession with express-session
app.use(
  session({
    secret: keys.session.cookieKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: keys.mongodb.dbURI }),
    cookie: { secure: true }, // Set to true if using HTTPS
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
    console.error('Error connecting to MongoDB via Mongoose', err);
  });

// Import routes
const pageLinksRoutes = require('./public/routes/page-links-routes');
const publicUserRoutes = require('./public/routes/public-user-routes');
const userRoutes = require('./public/routes/user-routes');

app.get('/api/hello', (req, res) => {
  res.send('Hello from the serverless function!');
});

// Define global public routes (no authentication required)
app.use('/api', publicUserRoutes, pageLinksRoutes);

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
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
