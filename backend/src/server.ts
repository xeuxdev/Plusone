import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import userRouter from "./routes/user.routes";

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json()); // Add this line to parse JSON request bodies

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});

// Register API routes
app.use("/api/v1/user", userRouter);

app.all("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ error: `${req.method} on ${req.originalUrl}  not found` });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
