const express = require("express");
const mongoose = require("mongoose");
const bodyparser= require("body-parser");
const ContactRouter = require("./src/routers/contact");




const app = express();
app.use(express.json())
app.use(bodyparser.json());
app.use("/v1", ContactRouter);
// app.use("/contact" , contactRoutes);

// mongoose.connect("mongodb://localhost/USERDBMONGOOSECONTACT");
const URI = "mongodb://127.0.0.1:27017/contactManagement";
  mongoose.connect(URI).then(() => {
    console.log("Connected to DB");
  });


app.get("*", (req, res) => {
    res.status(404).send("API is not found")
})

app.listen(3000, console.log("Server at the port 3000"));