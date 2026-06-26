const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxlength: 30,
    },
    age: {
      type: Number,
      required: true,
      min: [0, "Age cannot be negative"],
      max: [120, "Age cannot exceed 120"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    work: {
      type: String,
      required: true,
      enum: ["chef", "waiter", "manager"],
    },
    address: {
      type: String,
      required: false,
    },
    salary: {
      type: Number,
      required: true,
    },
    favoriteMenu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu", // Points to Menu collection
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
