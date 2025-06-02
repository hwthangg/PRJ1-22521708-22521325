import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookie from 'cookie'
import http from 'http';
import { Server } from 'socket.io';
import { configDotenv } from "dotenv";
import { AccountRoutes, AuthRoutes, ChapterRoutes, DocumentRoutes, MessageRoutes } from "./routes/index.js";
import { connectDB } from "./configs/index.js";
import EventRoutes from "./routes/event.route.js";
import MemberRoutes from "./routes/member.route.js";
import { sendInvite } from "./sockets/notifications.socket.js";
import { verifyToken } from "./utils/handleToken.js";
import { on } from "events";


connectDB()
configDotenv();
const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // hoặc dùng array nếu nhiều domain
    methods: ["GET", "POST"],
    credentials: true,
    path: '/socket.io'
    // 🔥 QUAN TRỌNG
  }
})

app.use(cors({
  origin: 'http://localhost:5173', // React app
  credentials: true // nếu cần gửi cookie
}));
app.use(express.json());


app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send(`Access to hwthang's server`);
});

app.use('/api/accounts', AccountRoutes)
app.use('/api/chapters', ChapterRoutes)
app.use('/api/auth', AuthRoutes)
app.use('/api/documents', DocumentRoutes)
app.use('/api/events', EventRoutes)
app.use('/api/members', MemberRoutes)
app.use('/api/messages', MessageRoutes)
// --- Namespace: /admin ---
let onlChatUsers = []
io.on('connection', (socket) => {
  console.log('Account connected:', socket.id);
  const cookies = cookie.parse(socket.handshake.headers.cookie || '');

  const accountId = verifyToken(cookies.token).id

  onlChatUsers[`${accountId}`] = socket.id

  console.log(onlChatUsers)

  socket.on('chat', (send) => {
    console.log(onlChatUsers[send.partner])
    io.to(onlChatUsers[send.partner]).emit('chat', { senderId: send.me, message: send.text, status: "unread" })
  })


  socket.on('disconnect', () => {
    console.log('Account disconnected:', socket.id);
  });
});



server.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
