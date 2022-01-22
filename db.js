const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://naveen:naveen%40coursera@cluster0.gtgme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )
    .then((data) => console.log("db connected"))
    .catch((err) => console.log(err));
};

module.exports = { dbConnection };
