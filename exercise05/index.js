const express = require('express');
const app = express();
const SERVER_PORT = process.env.port || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// http://localhost:3000/
app.get('/', (req, res) => {
    res.status(200);
    res.send('<h1>Hello World</h1>');
});

// http://localhost:3000/about
app.get('/about', (req, res) => {
    res.send('<h1>About Us</h1>');
})

// http://localhost:3000/contact?name=John&email=john@gmail
app.post('/contact', (req, res) => {
    console.log(`POST Query: ${JSON.stringify(req.query)}`);
    console.log(`POST Body: ${JSON.stringify(req.body)}`);
    //res.send('<h1>Contact Us</h1>');
    res.send(req.query);
})

// Query Parameters
// http://localhost:3000/products?category=shoes&color=blue
app.get('/products', (req, res) => {
    console.log(req.query);
    // const { category, color } = req.query;
    if(req.query.category === undefined || req.query.color === undefined) {
        const error = {
            status: false,
            message: 'please specify category and color query parameters'
        }
        res.send(error);
    } else {
        const category = req.query.category;
        const color = req.query.color;

        // res.type('html');
        res.setHeader('Content-Type', 'text/html');
        res.status(201)
           .send(`<h1>Products Query Parameter</h1>
                <p>Category: ${category}</p>
            <p>Color: ${color}</p>`);
    // res.send(req.query)
        
    }
})

// Route Parameters
// http://localhost:3000/products/shoes/blue
app.get('/products/:category/:color', (req, res) => {
    console.log(req.params);
    const { category, color } = req.params;
    res.send(`<h1>Products Route Parameter</h1>
            <p>Category: ${category}</p>
            <p>Color: ${color}</p>`);
})

// Body Object
// Post Request
// http://localhost:3000/products
app.post('/products', (req, res) => {
    const products = req.body;
    console.log(products);
    res.type('json');
    // res.setHeader('Content-Type', 'application/json');
    res.json(products);
    //res.send('<h1>Products Post</h1>');
})

// PUT Request and body object
// http://localhost:3000/products/1

app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const products = req.body;
    console.log(products);
    res.send(`<h1>Product ID to PUT</h1>
            <p>ID: ${id}</p>`);
})

// http://localhost:3000/products/1
app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    res.send(`<h1>Product ID to DELETE</h1>
            <p>ID: ${id}</p>`);
})

// http://localhost:3000/header
app.get('/header', (req, res) => {
    // res.header('Content-Type', 'text/html');
    // res.setHeader('Content-Type', 'text/html');
    // req.get('Content-Type');
    // req.headers['Content-Type'];
    res.send(req.headers);
})

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port http://localhost:${SERVER_PORT}`);
})