const express = require('express');
const mongoose = require('mongoose');
//import routes
const userRoutes = require('./routes/UserRoutes.js');
const chapterRoutes = require('./routes/ChapterRoutes.js');
const documentRoutes = require('./routes/DocumentRoutes.js')
const memberRoutes = require('./routes/MemberRoutes.js')

const app = express();
//connect db
mongoose
  .connect("mongodb://localhost:27017/TestServer")
  .then(() => console.log("💻 Mondodb Connected"))
  .catch(err => console.error(err));

app.use(express.json());

app.get("/", (req,res)=>{
  res.send("Hello World")
})

// User routes
app.use('/api/users', userRoutes);

// Chapter routes
app.use('/api/chapters', chapterRoutes);

// Document routes
app.use('/api/documents', documentRoutes);

// Member routes
app.use('/api/members', memberRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});