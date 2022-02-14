const Movie = require('../models/Movie');

const restrictBasicUser = async (req, res, next) => {
  const { userId, role } = req.user;
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let fullYear = currentDate.getFullYear();
  const rec = await Movie.find({ userId });
  const recUser = [];
  rec.map((e) => {
    const dbMonth = e.date.getMonth();
    const dbYear = e.date.getUTCFullYear();
    if (dbMonth === currentMonth && dbYear === fullYear) recUser.push(e);
  });

  if (role === 'basic' && recUser.length >= 5) {
    return res.status(400).json({
      error: `You need to upgrade your account to premium, you can only create 5 movies per month with your basic account.`,
    });
  }

  return next();
};

module.exports = restrictBasicUser;
