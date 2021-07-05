const sequelize = require('../config/connection');
const { User, Categories, Exercises, Muscles, ExerciseImage } = require('../models');


const userData = require('./userSeed.json');
const categoryData = require('./categorySeed.json');
const exerciseData = require('./exerciseSeed.json');

const muscleData = require('./musclesSeed.json');
const exerciseImage = require('./exerciseImage.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const categories = await Categories.bulkCreate(categoryData);
  const exercise = await Exercises.bulkCreate(exerciseData);
  const muscle = await Muscles.bulkCreate(muscleData);
  const exImage = await ExerciseImage.bulkCreate(exerciseImage);


  process.exit(0);
};

seedDatabase();