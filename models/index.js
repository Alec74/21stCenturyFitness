const User = require('./User');
const Categories = require('./Categories');
const Exercises = require('./Exercises');
const Muscles = require('./Muscles');

const ExerciseImage = require('./ExerciseImage');
const Workouts = require('./Workouts');


const ExerciseImage = require('./ExerciseImage');

Exercises.belongsTo(Categories, {
  foreignKey: 'category_id',
});

Categories.hasMany(Exercises, {
 foreignKey: 'category_id',
 onDelete: 'CASCADE',
 onUpdate: 'CASCADE',
});


Workouts.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Workouts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Workouts.belongsTo(Exercises, {
  foreignKey: 'exercise_id',
});

Exercises.hasMany(Workouts, {
  foreignKey: 'exercise_id',
  onDelete: 'CASCADE',
});



module.exports = {
  User,
  Categories,
  Exercises,
  Muscles,
  ExerciseImage,
  Workouts,

};
