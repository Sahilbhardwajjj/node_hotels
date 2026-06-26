const express = require("express");
const connectDb = require("./src/config/db.js");
const personRoutes = require("./src/routes/personRoutes.js");
const menuRoutes = require("./src/routes/menuRoutes.js");
const loggedInfo = require("./src/middleware/loggingInfo.js");
const passport = require("passport");
const Person = require("./src/models/Person.js");
const localStratergy = require("passport-local").Strategy;

const app = express();

// Middleware
app.use(express.json());
app.use(loggedInfo);
passport.use(
  new localStratergy(async (username, password, done) => {
    try {
      // User should exist with that username
      const user = await Person.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const isPasswordMatch = user.password === password ? true : false;
      if (!isPasswordMatch) {
        return done(null, false, { message: "Password not matched" });
      }
      return done(null, user);
    } catch (error) {
      return done(error.message);
    }
  }),
);
app.use(passport.initialize());

// Routes
app.use("/person", personRoutes); // All person routes start with /api
app.use("/menu", menuRoutes); // All menu routes start with /api

// Home route
app.get("/", passport.authenticate("local", { session: true }), (req, res) => {
  res.json({ messge: "This is the Home Page" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({
    success: false,
    message: "Server error",
    error: err.message,
  });
});

// Connect database and start server
const startServer = async () => {
  try {
    await connectDb();

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("✗ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
