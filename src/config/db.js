const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    const MONGOURL = process.env.MONGODB_URL;
    await mongoose.connect(MONGOURL);
    console.log("✓ MongoDB Connected Successfully");
  } catch (err) {
    console.log("✗ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
