const dogRepository = require('../repository/dogRepository');

test('check total images hound', async () => {
 const result = await dogRepository.imageList('hound');
 console.log(result.message.length);
 expect(result.message?.length).toBe(808);
});
