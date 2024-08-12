require('dotenv').config();  
// Load environment variables from .env file
module.exports = {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    mongodb: {
      dbURI: process.env.MONGO_URI,
      database: "myProfileWebsite",
    },
    frontend: {
      url: process.env.FRONTEND_URL_ORIGIN,
    },
    session: {
      cookieKey: process.env.SESSION_SECRET,
    },
};