// require('dotenv').config();
// "type":"module"을 통해 import를 통해 가져올수 있음
// const mongoose = require('mongoose');
import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/UserRoutes.js';
dotenv.config();

const app = express();
// 미들웨어 -> 순서대로 수행
app.use(express.json());
// app.use('/api/user', userRoutes);

app.post('/signup', userRoutes);

app.post('/login', userRoutes);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
