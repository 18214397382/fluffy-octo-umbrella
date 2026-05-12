const express = require('express');
const app = express();
const PORT = process.env.PORT || 4173;

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Hello from Railway!' });
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});