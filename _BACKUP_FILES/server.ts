import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the static index.html file
app.use(express.static(path.join(__dirname, '../')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
  console.log(`
  🚀 WYA Dev Server Active
  🔗 Local: http://localhost:${PORT}
  📡 Intelligence ID: G-DQF0GRW2WG
  `);
});