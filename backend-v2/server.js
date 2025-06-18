import express from "express";
import cors from "cors";
import http from 'http';
import { Server } from 'socket.io';
import { configDotenv } from "dotenv";
import { connectMongoDB } from "./configs/mongodb.js";
import morgan from "morgan";
import AuthRoutes from "./routes/auth.route.js";
import AccountRoutes from "./routes/account.route.js";
import ChapterRoutes from "./routes/chapter.route.js";
import { handleSocket, setIO } from "./utils/socket.js";
import NotificationRoutes from "./routes/notification.route.js";
import MemberRoutes from "./routes/member.route.js";
import EventRoutes from "./routes/event.route.js";
import DocumentRoutes from "./routes/document.route.js";
import MessageRoutes from "./routes/message.route.js";
import EventRegistrationRoutes from "./routes/event_registration.route.js";
import FavoriteRoutes from "./routes/favorite.route.js";
import CommentRoutes from "./routes/comment.route.js";



connectMongoDB()
configDotenv();
const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    path: '/qldv/socket.io'
  }
})

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

app.get("/", (req, res) => {
  res.status(200).send(`Access to hwthang's server`);
});
setIO(io);
handleSocket(io)
app.use('/api/auth', AuthRoutes)

app.use('/api/accounts', AccountRoutes)
app.use('/api/chapters', ChapterRoutes)
app.use('/api/notifications', NotificationRoutes)

// app.use('/api/auth', AuthRoutes)
app.use('/api/documents', DocumentRoutes)
app.use('/api/events', EventRoutes)
app.use('/api/members', MemberRoutes)
app.use('/api/messages', MessageRoutes)
app.use('/api/event-registrations',EventRegistrationRoutes)
app.use('/api/favorites', FavoriteRoutes)
app.use('/api/comments', CommentRoutes)


server.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
