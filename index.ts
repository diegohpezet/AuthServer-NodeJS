import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(
  {
    credentials: true,
    exposedHeaders: ['Authorization']
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', routes)

app.listen(port, () => {
  console.log('App listening on port ' + port);
})