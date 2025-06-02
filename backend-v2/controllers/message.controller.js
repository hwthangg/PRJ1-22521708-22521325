
const MessageController = ()=>{

  const getHistoryMessage = async(req, res)=>{
    try {
      console.log(req.cookies.token)
      res.send('hôho')
    } catch (error) {
      
    }
  }
  

  return{
    getHistoryMessage
  }
}

export default MessageController()