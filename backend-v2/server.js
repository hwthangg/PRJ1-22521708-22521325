import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from 'http';
import { Server } from 'socket.io';
import { configDotenv } from "dotenv";
import { AccountRoutes, AuthRoutes, ChapterRoutes, DocumentRoutes } from "./routes/index.js";
import { connectDB } from "./configs/index.js";
import EventRoutes from "./routes/event.route.js";


connectDB()
configDotenv();
const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors({
  origin: 'http://localhost:5173', // React app
  credentials: true // nếu cần gửi cookie
}));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // ⚠️ KHÔNG được để '*'
    credentials: true, // ⚠️ BẮT BUỘC khi dùng cookie
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send(`Access to hwthang's server`);
});

app.use('/api/accounts', AccountRoutes)
app.use('/api/chapters', ChapterRoutes)
app.use('/api/auth', AuthRoutes)
app.use('/api/documents', DocumentRoutes)
app.use('/api/events', EventRoutes)



io.on('connection', (socket) => {
  console.log('✅ Client connected:', socket.id);

  // Gọi các module xử lý socket
  registerChatSocket(socket, io);
  registerNotificationSocket(socket, io);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
