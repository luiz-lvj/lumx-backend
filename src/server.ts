import dotenv from "dotenv";
const path = process.env.NODE_ENV === "test" ? ".env.test" : ".env";

dotenv.config({ path });

import express from 'express';
import cors from 'cors';
import { signup } from './controllers/signup';
import { sendTokens } from "./controllers/send";
import { createEvent, getEvents } from "./controllers/event";
import { getBalanceByWalletId } from "./controllers/influencer";
import { signin } from "./controllers/signin";




const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.post('/signup', async (req, res) => await signup(req, res));
app.post('/signin', async (req, res) => await signin(req, res));
app.post('/send', async (req, res) => await sendTokens(req, res));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/event', async (req, res) => await createEvent(req, res));
app.get('/events', async (req, res) => await getEvents(req, res));
app.get('/influencers/:walletId/balance', async (req, res) => await getBalanceByWalletId(req, res));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
