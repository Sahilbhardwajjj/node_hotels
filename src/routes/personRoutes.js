const express = require("express");
const Person = require("../models/Person");

const router = express.Router();

// POST: Adding new Person
router.post("/person", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    let savedUser = await newPerson.save();
    res
      .status(200)
      .json({ message: `User Saved Successfully ${savedUser.name}` });
  } catch (error) {
    res
      .status(200)
      .json({ error: `Error occured while creating user : ${error.message}` });
  }
});

// GET: Getting all the person in the restaurant
router.get("/persons", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json({
      message: `Their are ${data.length} users on the site`,
      users: data,
    });
  } catch (error) {
    console.json({
      error: `Error occured while getting users : ${error.message}`,
    });
  }
});

// GET: Getting only person specified with the work on the url ?work=waiter
router.get("/persons/:workType", async (req, res) => {
  try {
    const data = req.params.workType;
    const users = await Person.find({ work: data });
    res.status(200).json({
      message: `These are the users with ${data} work type`,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error Occured while fetching : ${error.message}`,
    });
  }
});

// GET: Getting person with specific details such as age:18
// /personDetail?age=28
router.get("/personDetail", async (req, res) => {
  try {
    const data = req.query;

    const fetchUser = await Person.find(data);

    if (fetchUser) {
      res.status(200).json({ message: "User Found", data: fetchUser });
    } else {
      res.status(400).json({ message: "User not found with this details" });
    }
  } catch (error) {
    res.json({ error: `Error occured : ${error.message}` });
  }
});

// GET: Get person by id and populate menu
router.get("/person/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Person.find({ _id: id });
    if (user) {
      res.status(200).json({ message: "User details", data: user });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
});

// PATCH: Updating the person entire Data
router.patch("/personUpdate/:id", async (req, res) => {
  try {
    const updateUserId = req.params.id;
    const updateInfo = req.body;

    const restrictedFields = ["name", "email"];

    const hasRestrictedField = Object.keys(updateInfo).some((key) =>
      restrictedFields.includes(key),
    );

    if (hasRestrictedField) {
      return res.status(400).json({
        message: "These fields cannot be updated.",
      });
    }

    const update = await Person.findByIdAndUpdate(updateUserId, updateInfo, {
      returnDocument: "after",
      runValidators: true,
    });
    if (update) {
      res.status(200).json({
        message: "User Updated Successfully",
        data: update,
      });
    } else {
      res.status(400).json({ message: "User not updated" });
    }
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
});

// Delete: Deleting a data
router.delete("/person/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // Check if person exist
    const person = await Person.findById(id);
    if (!person) {
      return res.status(500).json({ message: "User not Found" });
    }

    // Then delete that person
    const userDeleted = await Person.findByIdAndDelete(id);
    if (userDeleted) {
      res
        .status(200)
        .json({ message: "User Deleted Successfully", data: userDeleted });
    } else {
      res.status(500).json({ message: "User not deleted" });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error : ${error.message}`,
    });
  }
});

module.exports = router;
