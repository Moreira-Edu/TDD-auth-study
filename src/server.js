import * as dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

app.listen(3000, () => console.log("Server listening at port: 3000"));
