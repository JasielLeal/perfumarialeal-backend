import express from "express";
import "dotenv/config";
import cors from "cors";
import { routes } from "./routes";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, 'https://perfumarialeal-front.vercel.app')));

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running`);
});
