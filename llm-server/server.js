const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Chat interface');
});

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` before your route handlers!
app.use(express.json());

app.post('/run-codellama', (req, res) => {
  // Get the input from the request body
  const input = req.body.input;

  // Execute the codellama command with the input
  exec(`ollama  run llama2 ${input}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing codellama: ${error}`);
      return res.status(500).json({ error: `Error executing codellama: ${error}` });
    }
    res.status(200).json({ output: stdout });
  });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
