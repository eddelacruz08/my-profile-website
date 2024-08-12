require('dotenv').config();
// Load environment variables from .env file
module.exports = {
  google: {
    clientID:
      process.env.GOOGLE_CLIENT_ID || '1024830397914-gujkld6es5otu9lgskliulrec484cmsr.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
  },
  mongodb: {
    dbURI:
      process.env.MONGODB_URI ||
      'mongodb+srv://edmondelacruz110:dhu3FCsmd7fxiFC7@cluster0.bwpcxvy.mongodb.net/myProfileWebsite?retryWrites=true&w=majority&appName=Cluster0',
    database: 'myProfileWebsite',
  },
  frontend: {
    url: process.env.FRONTEND_URL_ORIGIN || 'https://profile-ten-mocha.vercel.app',
  },
  session: {
    cookieKey:
      process.env.SESSION_SECRET ||
      'e10b2a6f91d0b4114ca2b30dc119c8d84f8f2b79d7e6cdfed10e55d1009218cdb681bc0292c889a858fcce6d9cdadfc2922bc6567c6cc24578aa7f63a32be084',
  },
};
