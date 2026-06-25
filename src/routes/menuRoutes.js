const express = require("express");
const Menu = require("../models/Menu");

const router = express.Router();

// POST: Posting menu items
router.post("/menu", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new Menu(data);

    const menu = await newMenu.save();
    if (menu) {
      res.status(200).json({ message: "Item saved successfully", data: menu });
    } else {
      res.status(400).json({ message: "Item not saved" });
    }
  } catch (error) {
    res.json(500).json({ message: `error occured : ${error.message}` });
  }
});

// GET: Reading all the menus
router.get("/menus", async (req, res) => {
  try {
    const menu = await Menu.find();

    if (menu) {
      if (menu.length === 0) {
        return res.status(200).json({ message: `Menu is Empty` });
      }
      res.status(200).json({
        message: `Menu Fetched Successfully there are ${menu.length} items in menulist`,
        data: menu,
      });
    } else {
      res.status(400).json({
        message: "Menu not fetched",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error Occured: ${error.message}`,
    });
  }
});

// GET: Specific menu by id
router.get("/menu/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const menu = await Menu.findById(id);
    console.log(menu);

    if (menu) {
      res
        .status(200)
        .json({ message: "Item fetched successfully", data: menu });
    } else {
      res.status(500).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: `Error occurred: ${error.message}` });
  }
});

// Patch : Update menu item
router.patch("/menu/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const newMenu = await Menu.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (newMenu) {
      res.status(200).json({ message: "Menu Item updated successfully" });
    } else {
      res.status(400).json({ message: "Item not updated" });
    }
  } catch (error) {
    res.status(500).json({ message: `Error occurred ${error.message}` });
  }
});

router.delete("/menu/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the menu is present with this id
    const menu = await Menu.findById(id);
    if (!menu) {
      res.status(400).json({ message: "Item is not present on the menu" });
    }

    // Find and delete the item
    const deletedData = await Menu.findByIdAndDelete(id);
    if (deletedData) {
      res
        .status(200)
        .json({ message: `Item deleted successfully ${deletedData.name}` });
    } else {
      res.status(400).json({ message: "Data is not deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: `Error occurred ${error.message}` });
  }
});

module.exports = router;
