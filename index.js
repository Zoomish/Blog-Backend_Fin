import express from 'express';
import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://admin:QXmYtmxGgbF2Q6rx@cluster0.lebi7tr.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('Connected to MongoDB'))
const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})