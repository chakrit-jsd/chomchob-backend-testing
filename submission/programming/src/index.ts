import express from 'express';
import dotenv from 'dotenv';
import connectMongoose from './databases/connect.mongoose';

dotenv.config();


const app = express();


app.get('/ping', (req, res) => res.send('pong'))
// app.get('/testmodel', async (req, res) => {

//   // res.send(m);
// })

// app.get('/testall', async (req, res) => {
// })

const port = Number(process.env.BACKEND_PORT || 3000);

connectMongoose()

app.listen(port, () => {
  console.log(`App listening port: ${port}`)
});
