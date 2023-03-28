// retrieve all products
const getProducts = (req, res) => {
  const products = res.locals.products;
  res.status(200).json(products);
};

// retrieve a single product by ID
const getProductById = (req, res) => {
  const productId = req.params.id;
  const products = res.locals.products;

  const product = products.find((p) => p.productId === productId);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({
      error: `Product with ID ${productId} not found`,
    });
  }
};

// add a new product
const addProduct = (req, res) => {
  const {
    productName,
    productOwnerName,
    scrumMasterName,
    developers,
    startDate,
    methodology,
  } = req.body;

  // validate that all required fields are present
  // if (
  //   !productName ||
  //   !productOwnerName ||
  //   !scrumMasterName ||
  //   !developers ||
  //   !startDate ||
  //   !methodology
  // ) {
  //   res.status(400).json({
  //     error: "All fields are required",
  //   });
  //   return;
  // }

  const products = res.locals.products;

  // generate a new product ID
  const maxId = Math.max(...products.map((p) => p.productId), 0);
  const newProductId = maxId + 1;

  // create the new product object
  const newProduct = {
    productId: newProductId,
    productName,
    productOwnerName,
    developers,
    scrumMasterName,
    startDate,
    methodology,
  };

  // add the new product to the list of products
  products.push(newProduct);
  console.log(products);
  // return the new product object
  res.status(201).json(newProduct);
};

// edit a specific product
const editProduct = (req, res) => {
  const productId = req.params.id;
  const products = res.locals.products;
  const product = products.find((p) => p.productId === productId);

  const {
    productName,
    scrumMasterName,
    productOwnerName,
    developers,
    methodology,
  } = req.body;

  if (product) {
    // Update product details
    product.productName = productName || product.productName;
    product.scrumMasterName = scrumMasterName || product.scrumMasterName;
    product.productOwnerName = productOwnerName || product.productOwnerName;
    product.developers = developers || product.developers;
    product.methodology = methodology || product.methodology;

    res.status(200).json({
      message: `Product with ID ${productId} successfully updated`,
    });
  } else {
    res.status(404).json({
      error: `Product with ID ${productId} not found`,
    });
  }
};

const findProductsByScrumMasterName = (req, res) => {
  const products = res.locals.products;
  const { scrumMasterName } = req.params;
  console.log(req.params);
  // Filter the products based on the Scrum Master name
  const filteredProducts = products.filter((product) =>
    product.scrumMasterName
      .toLowerCase()
      .includes(scrumMasterName.toLowerCase())
  );

  const totalProducts = filteredProducts.length;

  if (filteredProducts.length) {
    res.status(200).json({ totalProducts, filteredProducts });
  } else {
    res.status(404).json({
      error:
        "No product found. Please make sure you have entered the full name of scrum master correctly.",
    });
  }
};

const findProductsByDeveloper = (req, res) => {
  const products = res.locals.products;
  const { developerName } = req.params;
  console.log(req.params);
  // Filter the products based on the Developer name
  const filteredProducts = products.filter((product) =>
    product.developers.includes(developerName)
  );
  const totalProducts = filteredProducts.length;

  if (filteredProducts.length) {
    res.status(200).json({ totalProducts, filteredProducts });
  } else {
    res.status(404).json({
      error:
        "No product found. Please make sure you have entered the full name of the Developer correctly.",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  findProductsByScrumMasterName,
  findProductsByDeveloper,
};
