const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
 datasources: { db: { url: process.env.DATABASE_URL } }
});

const userData = [
 {
  name: 'udin',
  age: 30,
  gender: 'male',
  email: 'udin@mail.com',
  Post: {
   create: {
    title: 'hidup sehat',
    content: 'jangan bergadang',
    published: true
   }
  },
  Profile: {
   create: {
    bio: 'hidup sehat supaya sehat'
   }
  }
 },
 {
  name: 'ujang',
  age: 50,
  gender: 'male',
  email: 'ujang@mail.com',
  Post: {
   create: {
    title: 'hidup ga sehat',
    content: 'siksa kubur',
    published: true
   }
  },
  Profile: {
   create: {
    bio: 'hidup sekali saja'
   }
  }
 },
 {
  name: 'ucha',
  age: 23,
  gender: 'female',
  email: 'ucha@mail.com',
  Profile: {
   create: {
    bio: 'selamat sore mas andre'
   }
  }
 }
];

async function main() {
 userData.map(async (user) => {
  const newUser = await prisma.user.create({
   data: user
  });
  console.log(`Created user with id: ${newUser.id}`);
 });
 console.log(`Seeding finished.`);
}

main()
 .then(async () => {
  await prisma.$disconnect;
 })
 .catch(async (err) => {
  console.log(err);
  await prisma.$disconnect;
  process.exit(1);
 });
