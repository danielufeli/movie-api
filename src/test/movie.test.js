const mongoose = require('mongoose');
const { fetchMovie, getMovies, newMovie } = require('../helpers/dataObject');
const { mongoURI } = process.env;

let req = {
  body: { title: 'Fast and Furious' },
  user: { userId: 434 },
};

let falseReq = {
  body: { title: '1111111' },
  user: { userId: 111 },
};

describe('/movie', () => {
  beforeAll((done) => {
    mongoose.connect(
     ` ${mongoURI}`,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done()
    );
  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  describe('/movie', () => {
    it('should return movie from Api', async () => {
      const fetch = await fetchMovie('Fast and Furious');
      expect(fetch.Response).toBe('True');
    });
    it('should return false is wrong movie title from Api', async () => {
      const fetch = await fetchMovie('klwoeoowo');
      expect(fetch.Response).toBe('False');
    });
  });

  describe('get all users movies', () => {
    it('should return all users movie', async () => {
      const movies = await getMovies(req);
      expect(movies.data.length >= 1).toBe(true);
      expect(movies.status).toBe(200);
    });
    it('should return false if no movie found', async () => {
      const movies = await getMovies(falseReq);
      expect(movies.status).toBe('false');
    });
  });

  describe('create movies', () => {
    it('should create movie', async () => {
      const movies = await newMovie(req);
      expect(movies.status).toBe(201);
    });
    it('should return false if a  wrong movie title is entered', async () => {
      const movies = await newMovie(falseReq);
      expect(movies.status).toBe('false');
    });
  });
});
