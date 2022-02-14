const Movies = require('../models/Movie');

const checkMovie = async (req, res, next) => {
  let { title } = req.body;
  title = title.toLowerCase();
  const { userId } = req.user;
  let movie = await Movies.findOne({ userId, title });

  if (movie) {
    return res.status(400).json({
      error: `The movie with title: ${movie.title} has already been created`,
    });
  }

  return next();
};

module.exports = checkMovie;
