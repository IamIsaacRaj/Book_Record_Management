const express = require("express");
//importing routes
const usersRouter = require("./routes/users")
const booksRouter = require("./routes/books")
const app = express();

const PORT  = 8081;

app.use(express.json());

app.get('/',(req,res) => {
  res.status(200).json({
    message : "server is up and running",
  });
});

app.use("/users",usersRouter);
app.use("/books",booksRouter)

app.get('*',(req,res) => {
  res.status(404).json({
    message : "This Route does not exits",
  });
});

app.listen(PORT,() => {
  console.log(`Server is running at port ${PORT}`);
});

// http://localhost:8081