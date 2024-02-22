// Import necessary modules
const express = require("express");
const path = require("path");
const pgp = require("pg-promise")();
const cors = require("cors");

// Database configuration
const dbConfig = {
  user: "postgres",
  password: "nikanika7",
  host: "localhost",
  port: 5432,
  database: "UI",
};

// Create a new database connection
const db = pgp(dbConfig);

// Create an Express app
const app = express();
const port = 4000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Registration route
app.post("/submit", async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await db.oneOrNone(
      "SELECT * FROM user_info WHERE email = $1",
      email
    );

    if (existingUser) {
      // If the email already exists, send a response indicating it's already registered
      return res.send("Email already registered");
    }

    // If the email doesn't exist, insert the data into the PostgreSQL table, including the 'password' and 'email' fields
    await db.none(
      "INSERT INTO user_info (name, lastname, email, password) VALUES ($1, $2, $3, $4)",
      [name, lastname, email, password]
    );

    // Log the data to the console
    console.log(
      `Received data: Name - ${name}, Last Name - ${lastname}, Email - ${email}, Password - ${password}`
    );

    // Send a response back to the client
    res.send("Registration successful");
  } catch (error) {
    console.error("Error inserting data into the database:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Logout route
app.post("/logout", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve the stored hashed password from the database based on the provided email
    const storedData = await db.oneOrNone(
      "SELECT password FROM user_info WHERE email = $1",
      [email]
    );

    if (storedData) {
      // Compare the provided password with the stored hashed password
      if (password === storedData.password) {
        // Password matches, perform logout (you can clear sessions, etc.)
        res.send("Logout successful");
      } else {
        // Password doesn't match, send an error response
        res.status(401).send("Incorrect password");
      }
    } else {
      // User not found, send an error response
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/logout2", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve the stored hashed password from the database based on the provided email
    const storedData = await db.oneOrNone(
      "SELECT password FROM user_info WHERE email = $1",
      [email]
    );

    if (storedData) {
      // Compare the provided password with the stored hashed password
      if (password === storedData.password) {
        // Password matches, perform logout (you can clear sessions, etc.)
        res.send("Logout successful");
      } else {
        // Password doesn't match, send an error response
        res.status(401).send("Incorrect password");
      }
    } else {
      // User not found, send an error response
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/checkLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check the login credentials in the database
    const user = await db.oneOrNone(
      "SELECT * FROM user_info WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (user) {
      // Login successful
      res.json({ success: true, message: "Login successful" });
    } else {
      // Login failed
      res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error checking login:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
