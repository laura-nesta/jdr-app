const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    // mongoose.connect(process.env.MONGO_URI);
    mongoose.connect("mongodb://localhost/jdr-app-db");
    console.log("Mongo connecté");
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

module.exports = connectDB;
