const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  findProductsByScrumMasterName,
  findProductsByDeveloper,
} = require("./handlers");

const port = process.env.PORT || 5000;

// placing the users in memory | a poor man's database ;)
// any changes to the this data will persist only until the server restarts.
const products = require("./data/products.json");

// this function add the products array to the res object so that subsequent
// functions can access it via res.locals.products.
// We need to do this because the handlers are in a different file
// and don't have access to the products variable that was declared in index.js.
const passProductsAlong = (req, res, next) => {
  res.locals.products = products; // adds products to the res
  next(); // this passes the req, and res to the next handler in chain
};

const app = express();
// allow CORS for all routes
app.use(cors());
// global middleware to add products to response locals
app.use(passProductsAlong);
app.use(morgan("tiny"));
app.use(express.json());

// REST endpoints
//=======================================

// health endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "API Component is healthy ✔",
  });
});

// retrieve all products
app.get("/api/products", getProducts);

// retrieve a single product by ID
app.get("/api/product/:id", getProductById);

// add a new product
app.post("/api/new-product", addProduct);

// edit a specific product
app.patch("/api/update-product/:id", editProduct);

// retrieve products by Scrum Master name
app.get(
  "/api/products/scrum-master/:scrumMasterName",
  findProductsByScrumMasterName
);

// retrieve products by Developer name
app.get("/api/products/developer/:developerName", findProductsByDeveloper);

//=======================================

// this is catch all endpoint.
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Not Found",
  });
});

// Node spins up the server and sets it to listen on port 5000 or process.env.PORT
app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
