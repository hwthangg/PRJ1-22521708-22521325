import express from 'express'
import cors from "cors";
import cookieParser from 'cookie-parser'
import { configDotenv } from 'dotenv'
import connectDB from './configs/database/connectDB.js'
import AuthRoutes from './routes/auth.route.js'
import ConversationRoutes from './routes/conversation.route.js';


connectDB()

configDotenv()
const PORT = process.env.PORT

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',  // ⚠️ KHÔNG được để '*'
  credentials: true                 // ⚠️ BẮT BUỘC khi dùng cookie
}));

app.use(cookieParser());

app.get('/', (req,res)=>{
  res.status(200).send(`Access to hwthang's server`)
})

app.use('/api/auth', AuthRoutes)
app.use('/api/conversations', ConversationRoutes)


app.listen(PORT, ()=>console.log(`Server: http://localhost:${PORT}`))