import "./setup";

import express from 'express';
import cors from 'cors';
import { signin } from './controllers/signin';
import { sendTokens } from "./controllers/send";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.post('/signin', async (req, res) => await signin(req, res));
app.post('/send', async (req, res) => await sendTokens(req, res));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});