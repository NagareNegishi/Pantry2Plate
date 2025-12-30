// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// quick test endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is running!' });
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});