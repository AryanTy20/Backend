import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoute, productRoute } from "./routes";
import errorHandler from "./middleware/errorHandler";
import dbConnect from "./helper/database";

dbConnect();

const PORT = process.env.PORT || 8000;
//Settings
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoute);
app.use(productRoute);
app.use("*", (req, res) => {
  res.status(404).json({ msg: "page not found" });
});
app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
