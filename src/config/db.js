const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sahilBhardwaj:sahil200517@cluster0.vug4f6t.mongodb.net",
    );
    console.log("✓ MongoDB Connected Successfully");
  } catch (err) {
    console.log("✗ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
