// server.js

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios'); // We'll use axios for API calls

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to handle questions from the frontend
app.post('/api/question', async (req, res) => {
  const { question } = req.body;

  // Validate the input
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    // Example: Call the external AI API
    // Replace the URL and request body with what your API requires.
    const response = await axios.post(
      'https://api.example.com/your-endpoint',  // Change this to your actual API endpoint
      { question },                             // The data your API expects
      {
        headers: {
          'Authorization': `Bearer ${process.env.API_KEY}`,  // Use your API key from .env
          'Content-Type': 'application/json'
        }
      }
    );

    // Assuming the API returns an answer in response.data.answer
    res.json({ answer: response.data.answer });
  } catch (error) {
    console.error('Error communicating with the API:', error.message);
    res.status(500).json({ error: 'Error communicating with the API' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
