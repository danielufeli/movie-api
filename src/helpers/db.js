const mongoose = require('mongoose');

const { mongoURI } = process.env;

module.exports = connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);

    process.exit(1);
  }
};

