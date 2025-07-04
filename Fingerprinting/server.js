const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.static('public')); // Serve HTML from public folder

app.post('/collect', (req, res) => {
  const { visitorId, components, trackingId } = req.body;

  const logEntry = {
    timestamp: new Date(),
    visitorId,
    trackingId,
    components,
  };

  fs.appendFileSync('fingerprints.log', JSON.stringify(logEntry) + '\n');
  console.log("Fingerprint collected:", visitorId);
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on http://localhost:3000');
});