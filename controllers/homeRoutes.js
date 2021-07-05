const router = require('express').Router();

const { QueryTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { Exercises, Categories, User, ExerciseImage, Muscles, Workouts } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
  //  Get all exercise categories
    const categoryData = await Categories.findAll({
      include: [
        {
          model: Exercises,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const categories = categoryData.map((category) => category.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      categories, 
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/exercise', async (req, res) => {

  try {
    const exerciseData = await Categories.findAll({
      // where:{ category_id: 9 }, // Can be replaced with a parameter passed in
      order: [['name', 'ASC'], [Exercises, 'name', 'ASC']],
      include: [
        {
          model: Exercises,
          attributes: ['name','description','id','gif_image'],
        },
        
      ],
    });
    // console.log(JSON.stringify(exerciseData)); // To view the details of the exerciseData object. 
    
    const categories = exerciseData.map((exercise) => exercise.get({ plain: true}));

    res.render('exercise', {
      categories,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Works, but page doesn't reload with filtered list, look into this with sequelize/handlebars.....M.Mason
router.get('/exercise/:id', async (req, res) => {

  // Find all exercises in a given category
  try {
    const exerciseData = await Exercises.findAll({
      where:{ category_id: req.params.id },

      order: [['name', 'ASC']],
      include: [
        {
          model: Categories,
          attributes: ['name'],
        },
        
      ],
    });
    
    const exercises = exerciseData.map((exercise) => exercise.get({ plain: true}));
    console.log(exercises);


    res.render('exercise', {
      exercises,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {

  let userID = req.session.user_id;
  let sql =  `SELECT u.id, u.first_name, u.last_name, e.name as Exercise, c.name as Category,
  COUNT(w.exercise_id) as TotalExercises, SUM(w.sets) as TotalSets, SUM(w.reps) as TotalReps,
  SUM(w.total_minutes) as TotalMinutes FROM user u JOIN workouts w ON u.id = w.user_id
  JOIN exercises e ON e.id = w.exercise_id JOIN categories c ON c.id = e.category_id
  WHERE u.id = ${userID}
  GROUP BY u.id,u.first_name,u.last_name,e.name,c.name ORDER BY c.name`

  try {
    // Find the logged in user based on the session ID
    const userData = await sequelize.query(sql,{ type: QueryTypes.SELECT });
      // User.findByPk(
      // req.session.user_id, {
      // attributes: { exclude: ['password'] },
      // include: [{ model: Workouts }]
    // });

    // const user = userData.get({ plain: true });
    console.log(userData);
    res.render('profile', {
      ...userData,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});


module.exports = router;