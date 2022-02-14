const Movie = require('../models/Movie');

const checkMovie = async (req, res, next) => {
  const { title } = req.body;
  const { userId } = req.user;
  let movie = await Movie.findOne({ title, userId });

  if (movie) {
    return res
      .status(400)
      .json({
        error: `The movie with title: ${movie.title} has already been created`,
      });
  }

  return next();
};

module.exports = checkMovie;
