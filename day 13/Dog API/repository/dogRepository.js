const { default: axios } = require('axios');
const redis = require('redis');

const client = redis.createClient({
 url: `redis://localhost:6379`,
 legacyMode: true
});
const dogRepository = {
 imageList: async (breed) => {
  //   if (!client.isOpen) {
  //    client.connect();
  //   }
  //   let images;
  //   client.get(breed, async (err, dogs) => {
  //    console.log(JSON.parse(dogs)?.message?.length);

  //    if (dogs) {
  //     images = JSON.parse(dogs);
  //     // console.log(images);
  //     return images;
  //    }

  //    const { data } = await axios.get(`https://dog.ceo/api/breed/${breed}/images
  // `);

  //    client.setEx(breed, 100, JSON.stringify(data));
  //    images = data;

  //    return images;
  //   });
  //   console.log(images);

  const { data } = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);

  return data;
 }
};

module.exports = dogRepository;
