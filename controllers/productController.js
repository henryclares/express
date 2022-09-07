const fs = require('fs');

exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`),
  );

  res.status(200).json({
    status: 'success',
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`),
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: 'success',
    data: {
      products,
    },
  });
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`),
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: 'success',
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: 'not found',
    });
  }
};
exports.deleteProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`),
  );

  const newProducts = products.filter((p) => p.id != req.params.id);

  fs.writeFileSync(
    `${__dirname}/data/products.json`,
    JSON.stringify(newProducts),
  );

  res.status(200).json({
    status: 'success delete',
  });
};
exports.updateProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`),
  );

  const {name, price, category} = req.body;
  const index = products.findIndex((p) => p.id == req.params.id);

  const product = {
    name,
    price,
    category,
  };

  products[index] = { id: products[index].id, ...product };
  fs.writeFileSync(`${__dirname}/data/products.json`, JSON.stringify(products));
  if (index) {
    res.status(200).json({
      status: 'success update',
    });
  } else {
    res.status(404).json({
      status: 'not found',
    });
  }
};
