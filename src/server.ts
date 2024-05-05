import "./setup";

import express from 'express';
import cors from 'cors';
import { signin } from './controllers/signin';
import { sendTokens } from "./controllers/send";
import { createEvent, getEvents } from "./controllers/event";
import { getBalanceByWalletId } from "./controllers/influencer";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.post('/signin', async (req, res) => await signin(req, res));
app.post('/send', async (req, res) => await sendTokens(req, res));



app.post('/event', async (req, res) => await createEvent(req, res));
app.get('/events', async (req, res) => await getEvents(req, res));
app.get('/influencers/:walletId/balance', async (req, res) => await getBalanceByWalletId(req, res));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});