import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js'

const app = express();

app.use('/posts', postRoutes)

app.use(express.json({ limit: "30mb", extended: true}))
app.use(express.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())

const CONNECTION_URL = 'mongodb+srv://cmkc109:christymern123@memories.gfr7k3w.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
   .then( () => app.listen(PORT, () => console.log('Server connected')))
   .catch( (error) => console.log(error.message))
