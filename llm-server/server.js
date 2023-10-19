const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Chat interface');
});

app.get('/run-codellama', (req, res) => {
  exec('codellama your-input-here', (error, stdout, stderr) => {
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
