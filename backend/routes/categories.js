const router = require("express").Router();
const Category = require("../models/Category.js");

router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const saveCategory = await newCategory.save();
    res.status(200).json(saveCategory);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
