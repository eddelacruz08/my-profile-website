const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();
const keys = require('./public/config/keys');

let database;

const connectToDatabase = async () => {
  try {
    const client = await MongoClient.connect(keys.mongodb.dbURI);
    console.log('Connected to MongoDB');
    database = client.db(keys.mongodb.database);
  } catch (err) {
    console.log('Error connecting to MongoDB', err);
    throw err; // Ensure errors are handled
  }
};

// Call this function to initialize the database
connectToDatabase();

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

// API to get user information by username
router.get('/users-information/get-user/:username', async (req, res) => {
  const username = req.params.username;

  console.log('Received username:', username);

  const db = getDatabase();

  try {
    const user = await db
      .collection('users')
      .findOne({ code: username }, { projection: { username: 1, thumbnail: 1, hasData: 1 } });

    if (!user) {
      console.error('User not found for username:', username);
      return res.status(404).send({ message: 'User not found', hasData: false });
    }

    let objectId;

    try {
      objectId = new ObjectId(user?._id);
    } catch (error) {
      console.error('Wrong Id format:', objectId);
      return res.status(404).send({ message: 'User not found' });
    }

    const userInfo = await db
      .collection('usersInformation')
      .aggregate([
        { $match: { users_id: objectId } },
        {
          $lookup: {
            from: 'trainingsAndCertifications',
            localField: '_id',
            foreignField: 'user_id',
            as: 'trainings_and_certifications',
          },
        },
        {
          $lookup: {
            from: 'educations',
            localField: '_id',
            foreignField: 'user_id',
            as: 'educations',
          },
        },
        {
          $lookup: {
            from: 'workExperience',
            localField: '_id',
            foreignField: 'user_id',
            as: 'work_experiences',
          },
        },
        {
          $unwind: {
            path: '$work_experiences',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'WEProjectDescriptions',
            localField: 'work_experiences._id',
            foreignField: 'work_experience_id',
            as: 'work_experiences.WEProjectDescriptions',
          },
        },
        {
          $group: {
            _id: '$_id',
            usersInformation: { $first: '$$ROOT' },
            work_experiences: { $push: '$work_experiences' },
          },
        },
        {
          $addFields: {
            'usersInformation.work_experiences': '$work_experiences',
          },
        },
        {
          $replaceRoot: { newRoot: '$usersInformation' },
        },
      ])
      .toArray();

    const skillsAndCompetencies = await db
      .collection('usersInformation')
      .aggregate([
        { $match: { users_id: objectId } },
        {
          $lookup: {
            from: 'SACCategories',
            localField: '_id',
            foreignField: 'user_id',
            as: 'SAC_Categories',
          },
        },
        {
          $unwind: {
            path: '$SAC_Categories',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'SACDescriptions',
            localField: 'SAC_Categories._id',
            foreignField: 'category_id',
            as: 'SAC_Categories.SAC_Descriptions',
          },
        },
        {
          $group: {
            _id: '$_id',
            usersInformation: { $first: '$$ROOT' },
            SAC_Categories: { $push: '$SAC_Categories' },
          },
        },
        {
          $addFields: {
            'usersInformation.SAC_Categories': '$SAC_Categories',
          },
        },
        {
          $replaceRoot: { newRoot: '$usersInformation' },
        },
      ])
      .toArray();

    if (userInfo.length === 0 || skillsAndCompetencies.length === 0) {
      return res.status(404).send({ message: 'User information not found', hasData: false });
    }

    res.send({
      ...userInfo[0],
      users: user,
      skills_and_competencies: skillsAndCompetencies[0],
    });
  } catch (error) {
    console.error('Error while retrieving user information:', error);
    res.status(500).send(error);
  }
});

module.exports = router;
