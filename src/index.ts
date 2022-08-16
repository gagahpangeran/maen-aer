import express, { Request, Response } from "express"
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Let the battle begin!');
});

app.post('/', function (req: Request, res: Response) {
  console.log(req.body);
  const moves = ['F', 'T', 'L', 'R'];
  res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
