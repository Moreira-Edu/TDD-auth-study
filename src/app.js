import express from "express";
import routes from "./routes/routes.js";

const app = express();

app.use(express.json()).use(routes);

app.get("/", (req, res) => {
  res.status(200).send();
});

export default app;
