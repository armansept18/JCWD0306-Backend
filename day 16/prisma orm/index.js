const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 2000;
app.use(express.json());
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
 datasources: { db: { url: process.env.DATABASE_URL } }
});

app.get('/users', (req, res) => {
 prisma.user
  .findMany({})
  .then((result) => res.send(result))
  .catch((err) => res.send(err?.message));
});

app.get('/users/:id', (req, res) => {
 prisma.user
  .findUnique({
   where: {
    id: Number(req.params.id)
   }
  })
  .then((result) => res.send(result))
  .catch((err) => res.send(err?.message));
});

app.patch('/users/:id', (req, res) => {
 prisma.user
  .update({
   where: {
    id: Number(req.params.id)
   },
   data: {
    ...req.body
   }
  })
  .then((result) => res.send(result))
  .catch((err) => res.send(err?.message));
});

app.post('/users', (req, res) => {
 prisma.user
  .create({
   data: {
    ...req.body
   }
  })
  .then((result) => res.send(result))
  .catch((err) => res.send(err?.message));
});

app.delete('/users/:id', (req, res) => {
 prisma.user
  .delete({
   where: {
    id: Number(req.params.id)
   }
  })
  .then((result) => res.send(result))
  .catch((err) => res.send(err?.message));
});

app.get('/posts', (req, res) => {
 prisma.post
  .findMany({
   include: {
    User: {
     select: { name: true, gender: true }
    }
   }
  })
  .then((result) => res.send(result))
  .catch((err) => res.send(err?.message));
});

app.get('/posts', (req, res) => {
 prisma.post
  .findMany({
   select: {
    _count: {
     select: { name }
    }
   },
   include: {
    User: {
     select: { name: true, gender: true }
    }
   }
  })
  .then((result) => res.send(result))
  .catch((err) => res.send(err?.message));
});

app.listen(PORT, () => {
 console.log(`listen on port ${PORT}`);
});
