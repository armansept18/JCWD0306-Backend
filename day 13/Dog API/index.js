const express = require('express');
const app = express();
const axios = require('axios');
const redis = require('redis');
const dogRepository = require('./repository/dogRepository');
const client = redis.createClient({
 url: `redis://localhost:6379`,
 legacyMode: true
});

// const dogRepository = {
//  images: async (breed) => {
//   try {
//    const data = await axios.get(`https://dog.ceo/api/breed/${breed}/list`);
//    console.log(data);
//    return data.data.message;
//   } catch (err) {
//    throw err;
//   }
//  }
// };
// module.exports = dogRepository;

const dogController = {
 imageList: async (req, res) => {
  try {
   const result = await dogRepository.images(req.params.breed);
   return res.status(200).send({
    result
   });
  } catch (err) {
   return res.status(err.statusCode || 500).json({
    message: err?.message
   });
  }
 }
};

app.get('/dogs/:breed', async (req, res) => {
 try {
  //   if (!client.isOpen) {
  //    client.connect();
  //   }
  //   const { breed } = req.params;
  //   client.get(breed, async (err, dogs) => {
  //    console.log(JSON.parse(dogs)?.message?.length);
  //    if (dogs) {
  //     return res.send(JSON.parse(dogs));
  //    }
  //    const { data } = await axios.get(`https://dog.ceo/api/breed/${breed}/images
  // `);
  //    client.setEx(breed, 100, JSON.stringify(data));
  //    res.send(data);
  //   });
  const data = await dogRepository.imageList(req.params.breed);
  res.send(data);
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
