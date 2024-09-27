const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse request bodies (form data)
app.use(bodyParser.urlencoded({ extended: false }));

// Serve a simple HTML page with two forms at the root
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to Exercise 04</h1>
    <p>Use the forms below to interact with the /user endpoint.</p>
    
    <!-- POST Form -->
    <h2>POST Method</h2>
    <form action="/user" method="POST">
      <label for="firstname_post">First Name:</label>
      <input type="text" id="firstname_post" name="firstname" value="Mehmet Ali" required><br><br>
      
      <label for="lastname_post">Last Name:</label>
      <input type="text" id="lastname_post" name="lastname" value="KABA" required><br><br>
      
      <button type="submit">Submit (POST)</button>
    </form>
    
    <hr>
    
    <!-- GET Form -->
    <h2>GET Method</h2>
    <form action="/user" method="GET">
      <label for="firstname_get">First Name:</label>
      <input type="text" id="firstname_get" name="firstname" value="Mehmet Ali" ><br><br>
      
      <label for="lastname_get">Last Name:</label>
      <input type="text" id="lastname_get" name="lastname" value="KABA"><br><br>
      
      <button type="submit">Submit (GET)</button>
    </form>
  `);
});

// GET /hello endpoint
app.get('/hello', (req, res) => {
  res.send('<h2>Hello Express JS</h2>');
});

// GET /user with query parameters
app.get('/user', (req, res) => {
  const firstname = req.query.firstname || 'Pritesh';
  const lastname = req.query.lastname || 'Patel';
  res.json({ firstname, lastname });
});

// POST /user with form data from HTML form
app.post('/user', (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  res.send(`
    <h1>User Information</h1>
    <p>First Name: ${firstname}</p>
    <p>Last Name: ${lastname}</p>
    <a href="/">Go Back</a>
  `);
});

// POST /user with path parameters
app.post('/user/:firstname/:lastname', (req, res) => {
  const { firstname, lastname } = req.params;
  res.json({ firstname, lastname });
});

// Start server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
