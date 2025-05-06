
import express from 'express'

const ConversationRoutes = express.Router()

ConversationRoutes.get('/', (req, res)=>res.send('get conversations'))
ConversationRoutes.get('/messages/:chapterId', (req, res)=>{console.log(req.params.chapterId);res.send('get messages')})

export default ConversationRoutes