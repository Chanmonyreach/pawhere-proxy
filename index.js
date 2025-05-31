const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 80;

// Your secure backend endpoint
const SECURE_URL = 'https://pawhere.onrender.com/pawhere';

app.use(bodyParser.json());

// Proxy route for ESP32
app.post('/pawhere', async (req, res) => {
  try {
    const { latitude, longitude, deviceId } = req.body;

    const response = await axios.post(SECURE_URL, {
      latitude,
      longitude,
      deviceId
    });

    res.status(response.status).send(response.data);
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(500).send({ success: false, message: 'Proxy error', error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('🔁 GPS HTTP Proxy Server is running');
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
