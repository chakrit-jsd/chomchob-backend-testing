import express from 'express';
import dotenv from 'dotenv';

dotenv.config();


const app = express();


app.get('/ping', (req, res) => res.send('pong'))

const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT || 3000);

app.listen(port, host, () => {
  console.log(`App listening http://www.${host}:${port}/`)
});
