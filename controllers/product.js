const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash"); // private variable
const fs = require("fs"); // file system
const category = require("../models/category");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("cateory")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }

      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm(); //formidble to read form data for images
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }
    //destructure the fields

    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all the fields",
      });
    }

    let product = new Product(fields);
    //handle fiel herre
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //console.log(product);
    // saving to db
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in db failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};
//Middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    // safety net to check if data is present or not
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete",
        Product: deletedProduct,
      });
    }
    res.json({
      message: "Delettion was success",
      deletedProduct,
    });
  });
};
//Update Product
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm(); //formidble to read form data for images
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    //updation code
    let product = req.product;
    product = _.extend(product, fields); // using loadsh extend methode to update the product with product in field
    //handle fiel herre
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //console.log(product);
    // saving to db
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Updation of Product failed",
        });
      }
      res.json(product);
    });
  });
};

//product Listing
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8; //by default 8 items on page
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No product found",
        });
      }
      res.json(products);
    });
};

exports.getallUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No category found",
      });
    }
    res.json(category);
  });
};

//Middleware to update stock and sold
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: {
          _id: prod._id,
        },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    // monogose bulk write
    if (err) {
      return res.status(400).json({
        error: "Bulk Operation Failed",
      });
    }
    next();
  });
};
