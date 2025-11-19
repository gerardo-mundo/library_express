import express from 'express';
import cors from 'cors';

import 'dotenv/config';

import authRouter from '@routes/authentication.route';
import bookRouter from '@routes/book.route';
import userRouter from '@routes/user.route';
import thesisRouter from '@routes/thesis.route';
import publicationRouter from '@routes/publication.route';

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
app.use('/api/thesis', thesisRouter);
app.use('/api/publications', publicationRouter);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
