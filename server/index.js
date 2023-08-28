import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import accountController from './controllers/account.js';
import gameController from './controllers/game.js';

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());

const port = 3001;

app.use('/api/account', accountController);
app.use('/api/game', gameController);

mongoose.connect(process.env.MONGO_URL)
.then(results => {
    app.listen(port, () => {
        console.log(`SERVER IS RUNNING ON PORT${port}....`);
    })
})
.catch(error => {
    console.log(error.message);
})
