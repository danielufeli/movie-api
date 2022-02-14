const express = require('express');
const bodyParser = require('body-parser');
const { authFactory, AuthError } = require('./helpers/auth');
const connectDB = require('./helpers/db');
const authCheck = require('./helpers/authCheck');
const { newMovie, getMovies } = require('./helpers/dataObject');
const {
  movieValidationRules,
  validate,
} = require('./middlewares/validateinputs');
const checkMovie = require('./middlewares/checkMovie');
const restrictBasicUser = require('./middlewares/restrictBasicUser');

const PORT = 3000;
const { JWT_SECRET, mongoURI } = process.env;

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET env var. Set it and restart the server');
}

const auth = authFactory(JWT_SECRET);
const app = express();
connectDB();

app.use(bodyParser.json());

app.post(
  '/movie',
  authCheck,
  movieValidationRules(),
  validate,
  restrictBasicUser,
  checkMovie,
  async (req, res, next) => {
    try {
      const { status, data } = await newMovie(req);
      if (status === 'false') {
        return res.status(400).json({ error: data });
      } else {
        return res.status(status).json(data);
      }
    } catch (error) {
      return res.status(500).json({ error: 'internal server error' });
    }
  }
);

app.get('/movie', authCheck, async (req, res, next) => {
  try {
    const { status, data } = await getMovies(req);
    if (status === 'false') {
      return res.status(400).json({ error: data });
    } else {
      return res.status(status).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: 'internal server error' });
  }
});

app.post('/auth', (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: 'invalid payload' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'invalid payload' });
  }

  try {
    const token = auth(username, password);

    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({ error: error.message });
    }

    next(error);
  }
});

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({ error: 'internal server error' });
});

app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});
