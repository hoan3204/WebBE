import express, { Request, Response } from 'express';

const app = express();
const port = 4000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Website dang chay tren cong ${port}`)
});