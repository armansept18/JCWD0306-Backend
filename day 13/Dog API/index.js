const express = require('express');
const app = express();
const axios = require('axios');
const redis = require('redis');
const client = redis.createClient({
 url: `redis://localhost:6379`,
 legacyMode: true
});

app.get('/dogs/:breed', async (req, res) => {
 try {
  if (!client.isOpen) {
   client.connect();
  }
  const { breed } = req.params;

  client.get(breed, async (err, dogs) => {
   if (dogs) {
    return res.send(JSON.parse(dogs));
   }

   const { data } = await axios.get(`https://dog.ceo/api/breed/${breed}/images
`);

   client.setEx(breed, 100, JSON.stringify(data));

   res.send(data);
  });
 } catch (err) {
  console.log(err);
  res.status(500).send(err?.message);
 }
});

client.on('error', (error) => {
 console.log(error);
});

app.listen(2000, () => {
 console.log(`listen on port 2000`);
});
