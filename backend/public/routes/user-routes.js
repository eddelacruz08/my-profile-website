const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();
const keys = require('./config/keys');

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

// API to get user information by user ID
router.get('/users-information/get-user', async (req, res) => {
  const userId = req.user.id;

  const db = getDatabase();

  // Convert userId to ObjectId
  let objectUserId;
  try {
    objectUserId = new ObjectId(userId);
  } catch (err) {
    res.status(400).send({ message: 'Invalid user ID format' });
    return;
  }

  try {
    const user = await db
      .collection('users')
      .find({ _id: objectUserId }, { projection: { username: 1, thumbnail: 1 } })
      .toArray();

    if (user.length === 0) {
      console.error('User not found for ID:', objectUserId);
      res.status(404).send({ message: 'User not found', hasData: false });
      return;
    }

    // Convert paramsId to ObjectId
    let objectParamsId;
    try {
      objectParamsId = new ObjectId(user[0]._id);
    } catch (err) {
      res.status(400).send({ message: 'Invalid params ID format' });
      return;
    }

    const result = await db
      .collection('usersInformation')
      .aggregate([
        {
          $match: { users_id: objectParamsId },
        },
        {
          $lookup: {
            from: 'trainingsAndCertifications', // The 'trainingsAndCertifications' collection
            localField: '_id',
            foreignField: 'user_id',
            as: 'trainings_and_certifications',
          },
        },
        {
          $lookup: {
            from: 'educations', // The 'educations' collection
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
            from: 'WEProjectDescriptions', // New table
            localField: 'work_experiences._id',
            foreignField: 'work_experience_id',
            as: 'work_experiences.WEProjectDescriptions',
          },
        },
        {
          $project: {
            // remove unnecessary fields
            users_id: 0,
            'educations.user_id': 0,
            'work_experiences.user_id': 0,
            'work_experiences.WEProjectDescriptions.work_experience_id': 0,
            'trainings_and_certifications.user_id': 0,
          },
        },
        {
          $group: {
            _id: '$_id',
            users_id: { $first: '$users_id' },
            usersInformation: { $first: '$$ROOT' }, // Keep full usersInformation document
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
        {
          $match: { users_id: objectParamsId },
        },
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
            from: 'SACDescriptions', // New table
            localField: 'SAC_Categories._id',
            foreignField: 'category_id',
            as: 'SAC_Categories.SAC_Descriptions',
          },
        },
        {
          $project: {
            // remove unnecessary fields
            users_id: 0,
            address: 0,
            bio: 0,
            emailAddress: 0,
            fullName: 0,
            phone: 0,
            position: 0,
            profileImg: 0,
            _id: 0,
            'SAC_Categories.SAC_Descriptions.category_id': 0,
            'SAC_Categories.user_id': 0,
          },
        },
        {
          $group: {
            _id: '$_id',
            users_id: { $first: '$users_id' },
            usersInformation: { $first: '$$ROOT' }, // Keep full usersInformation document
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

    if (result.length === 0) {
      res.status(404).send({ message: 'User not found', hasData: false });
      return;
    }

    res.send({ ...result[0], users: user[0], skills_and_competencies: skillsAndCompetencies[0] });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
