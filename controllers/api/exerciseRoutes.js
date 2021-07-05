const router = require('express').Router();
const { Exercises, Categories, User } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
    const newExercise = await Exercises.create({
      ...req.body,
      user_id: req.session.user_id,
    });


    res.status(200).json(newExercise);
  } catch (err) {
    res.status(400).json(err);
  }
});



// TODO: MODIFY THIS TO PULL IN EXERCISES BASED ON CATEGORY SELECTED ON THE EXERCISE PAGE. 
router.get('/:id', async (req, res) => {

  // Find all exercises in a given category
  try {
    const exerciseData = await Exercises.findAll({
      ...req.body,
      where:{ category_id: req.params.id },
      order: [['name', 'ASC']],
      include: [
        {
          model: Categories,
          attributes: ['name'],
        },
        
      ],
    });
    // console.log(JSON.stringify(exerciseData)); // To view the details of the exerciseData object. 
    
    const exercises = exerciseData.map((exercise) => exercise.get({ plain: true}));
   
    res.render('exercise', {
      exercises,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;