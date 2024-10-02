const express = require('express')
const app = express();
const { products, people } = require("./data.js");
const cookieParser = require('cookie-parser');
const peopleRouter = require('./routes/people');
const authRouter = require('./routes/auth.js');
//added for extra demo
const path = require('path');

//! Week4 Middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};



//!middleware Week 4, parsing body and cookies, logger.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(logger);

//added for extra demo
//http://localhost:5007/cats
//http://localhost:5007/cats.html

app.get('/cats', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cats.html'));
});
//lesson material http://localhost:5007/
app.use(express.static("./methods-public"));

//! WEEK 4
//http://localhost:5007/api/v1/people
app.use("/api/v1/people", peopleRouter);
app.use("/auth", authRouter);

//http://localhost:5007/api/v1/test
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "This is a working GET response!"})
})

//http://localhost:5007/api/v1/products
app.get("/api/v1/products", (req, res)=>{
  res.json(products);
})
//http://localhost:5007/api/v1/products/1
app.get("/api/v1/products/:productID", (req, res)=> {
  const { productID } = req.params;
  const product = products.find(product => product.id === parseInt(productID));

  if (!product) {
      return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});
//http://localhost:5007/api/v1/query?search=alb&limit=2
app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let filteredProducts = [...products];

  if (search) {
    filteredProducts = filteredProducts.filter(product => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(0, Number(limit));
  }

  if (filteredProducts.length < 1) {
    return res.status(200).json({ message: "No products matched your query." });
  }

  res.json(filteredProducts);
});
//http://localhost:5007/api/v1/products/price/20
app.get("/api/v1/products/price/:maxPrice", (req, res) => {
  const { maxPrice } = req.params;
  const filteredProducts = products.filter(product => product.price <= Number(maxPrice));

  if (filteredProducts.length < 1) {
    return res.status(404).json({ message: "No products found within the specified price range." });
  }

  res.json(filteredProducts);
});


app.all('*', (req, res)=> {
  res.status(404).json({message: "Route not found, try again!"})
})

const PORT = 5007
app.listen(PORT, ()=>{
  console.log(`Server is listening on port ${PORT}`);
})

