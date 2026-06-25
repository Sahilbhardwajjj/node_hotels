const express = require("express");
const connectDb = require("./src/config/db.js");
const personRoutes = require("./src/routes/personRoutes.js");
const menuRoutes = require("./src/routes/menuRoutes.js");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", personRoutes); // All person routes start with /api
app.use("/api", menuRoutes); // All menu routes start with /api

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "🏨 Hotel Management API",
    endpoints: {
      persons: {
        create: "POST /api/person",
        getAll: "GET /api/persons",
        getOne: "GET /api/person/:id",
        update: "PUT /api/person/:id",
        partialUpdate: "PATCH /api/person/:id",
        delete: "DELETE /api/person/:id",
      },
      menus: {
        create: "POST /api/menu",
        getAll: "GET /api/menus",
        getOne: "GET /api/menu/:id",
        update: "PUT /api/menu/:id",
        partialUpdate: "PATCH /api/menu/:id",
        delete: "DELETE /api/menu/:id",
      },
    },
  });
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

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("✗ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
