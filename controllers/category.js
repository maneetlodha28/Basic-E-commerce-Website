const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      res.status(400).json({
        error: "Category Not found in Db",
      });
    }

    req.category = cate; // abreviating category to cate
  });

  next();
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body); // creating new object  from model Category
  category.save((err, category) => {
    if (err) {
      res.status(400).json({
        error: "NOT able to save category in DB",
      });
    }

    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No categories found",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name; //taking name from front end

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update catorgry",
      });
    }

    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this category",
        category: category,
      });
    }
    res.json({
      message: "Successfully deleted",
    });
  });
};
