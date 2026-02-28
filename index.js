const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const BookModel = require("./models/Book.model");
const BookRouter = require("./routes/Books.route");

const app = express();
app.use(express.json());

// get request
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/books", BookRouter);

// create server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

mongoose
  .connect(process.env.CONNECTDB)
  .then(() => {
    console.log("Mongo DB connected");
  })
  .catch((error) => console.log(error));
