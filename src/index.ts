import express, { Request, Response } from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to my Home Page');
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
