import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";

const app: Express = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [process.env.FRONTEND_URL];

const corsOptions = (req: Request, callback: Function) => {
  let corsOptions;
  if (allowedOrigins.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptions));

app.use(express.json()); // Add this line to parse JSON request bodies

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});

// Register API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

app.all("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ error: `${req.method} on ${req.originalUrl}  not found` });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
