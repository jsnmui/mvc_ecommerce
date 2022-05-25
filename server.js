 
  // Loads express
  const express = require("express");
  // import the controller function
  const getData = require("./Controllers/getData");
  // call getData
  const ProductsData = getData();

  // create an instance of express
  const app = express();
  const PORT = 3000;

  // Middleware functions
  // they update the request as soon as they come in.
  app.use((req, res, next) => {
    console.log(`Running middleware function!!!`);
    next(); // got to the next middleware or to the response
  });
  // JSON Middleware
  app.use(express.json())
  // if we dont need to read data from the url 
  app.use(express.urlencoded({extended: false}))


  // Setup view engine
  app.set("view engine", "ejs");
  app.set("views", "./Views");

  // Root route
  app.get("/", (req, res) => {
      res.render("home", {
        pageTitle: "Home Page",
        pageHeader: "Welcome to Products Home Page",
      });
    });

  // display all fruits
    app.get("/products", (req, res) => {
      res.render("products", { data: ProductsData, pageTitle: "Products Page" });
    }); 

  // HTML Form
  app.get("/products/new", (req, res) => {
    res.render("newproducts");
  });

  // Create a new Fruit
  app.post("/products", (req, res) => {
    console.log(req);
    ProductsData.push(req.body)
    res.redirect('/products')
  });

  // display one fruit
  app.get("/products/:id", (req, res) => {
  
    const result = ProductsData.filter(item => item.id === Number( req.params.id))
    if (result[0] == undefined){
      res.status(404).render("404");
     } else {
          res.render("item", { products: result[0], pageTitle: `Product Details for ${result[0].title}`  });
     } 
  }); 

    // App Listener
  app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });