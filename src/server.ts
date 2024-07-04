import express from "express";
import "dotenv/config";
import cors from "cors";
import { routes } from "./routes";

const app = express();

const allowedOrigins = [process.env.FRONTEND, "http://localhost:5173"];

console.log(allowedOrigins)

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running`);
});
