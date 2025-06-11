import express from "express";
import cors from "cors";
import http from 'http';
import { Server } from 'socket.io';
import { configDotenv } from "dotenv";
import { connectMongoDB } from "./configs/mongodb.js";
import morgan from "morgan";
import AuthRoutes from "./routes/auth.route.js";



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

app.use(cors({}));
app.use(express.json());
app.use(morgan('dev'))

app.get("/", (req, res) => {
  res.status(200).send(`Access to hwthang's server`);
});


app.use('/api/auth', AuthRoutes)

// app.use('/api/accounts', AccountRoutes)
// app.use('/api/chapters', ChapterRoutes)
// app.use('/api/auth', AuthRoutes)
// app.use('/api/documents', DocumentRoutes)
// app.use('/api/events', EventRoutes)
// app.use('/api/members', MemberRoutes)
// app.use('/api/messages', MessageRoutes)

server.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
