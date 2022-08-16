import express, { Request, Response } from "express"
import bodyParser from "body-parser";
import move from "./move";

const app = express();

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Let the battle begin!');
});

app.post('/', function (req: Request, res: Response) {
  console.log(req.body);
  const result = move(req.body)
  res.send(result);
});

app.listen(process.env.PORT || 8080);
