import express from 'express';
import cors from 'cors';

import 'dotenv/config';

import authRouter from '@routes/authentication.route';
import userRouter from '@routes/user.route';

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
