const passport = require('passport');
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/callback', // Ensure this matches your Google API settings
      proxy: true, // Set to true if your app is behind a proxy or load balancer
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser); // If found, return the existing user
        }

        // If not found, create a new user
        const newUser = new User({
          googleId: profile.id,
          username: profile.displayName,
          thumbnail: profile.photos[0].value,
          hasData: false, // Initial flag for user data
        });

        await newUser.save(); // Save the new user to the database
        done(null, newUser); // Pass the new user to Passport
      } catch (err) {
        done(err); // Handle any errors
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize the user ID to the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Find the user by ID in the database
    done(null, user); // Deserialize the user and attach it to the request
  } catch (err) {
    done(err); // Handle any errors during deserialization
  }
});
