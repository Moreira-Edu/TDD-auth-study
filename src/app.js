import express from "express";
import Error from "./middleware/error/Error.js";
import routes from "./routes/routes.js";

const app = express();

app
  .use(express.json())
  .use(routes)
  .use(Error.handle);

export default app;
