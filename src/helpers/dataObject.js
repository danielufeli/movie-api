const axios = require('axios');
const Movies = require('../models/Movie.js');

const fetchMovie = async (title) => {
  const movie = await axios
    .get(`http://www.omdbapi.com/?apikey=f6e48e33&t=${title}`)
    .then((res) => {
      return res.data;
    });
  return movie;
};

const newMovie = async (req) => {
  let data;
  let { title } = req.body;
  title = title.toLowerCase();
  const { userId } = req.user;
  const omdbapiMovie = await fetchMovie(title);
  if (omdbapiMovie.Response === 'True') {
    const { Released, Genre, Director } = omdbapiMovie;
    data = new Movies({
      userId,
      title,
      Released,
      Genre,
      Director,
    });
    await data.save();
  } else {
    return {
      status: 'false',
      data: `No Movie Found for this title: ${title}`,
    };
  }
  return { status: 201, data };
};

const getMovies = async (req) => {
  const data = await Movies.find({ userId: req.user.userId });
  if (data.length < 1) {
    return { status: 'false', data: 'No Movie Found' };
  }
  return { status: 200, data };
};

module.exports = {
  newMovie,
  getMovies,
  fetchMovie,
};
