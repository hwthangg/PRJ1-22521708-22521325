import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();
const PORT = process.env.PORT;
const DB_CONNECT_STRING = process.env.DB_CONNECT_STRING;

mongoose
  .connect(DB_CONNECT_STRING)
  .then(() => console.log("💻 Mondodb Connected"))
  .catch((err) => console.error(err));

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ message: "HwThang's Server", data: {} });
});

// app.use("/api/auth", AuthRoutes)
import UserRoutes from "./routes/user.routes.js"
app.use("/api/users", UserRoutes)

// app.use("/api/chapters", ChapterRoutes)
// app.use("/api/members", MemberRoutes)
// app.use("/api/transfer-logs", TransferLogRoutes)
// app.use("/api/events", EventRoutes)
// app.use("/api/docs", DocRoutes)

app.listen(PORT, () => {
  console.log(`Server at: http://localhost:${PORT}`);
});
