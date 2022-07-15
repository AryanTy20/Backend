import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

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

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
