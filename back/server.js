const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const app = express();

const port = 5000;

// connexion a la db
connectDB();

// middleware qui traite les données du req
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Routes
app.use("/user", require("./routes/user.routes"));

//Lancer le server
app.listen(port, () => console.log("le serveur a demarer au port " + port));
