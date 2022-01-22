const express = require("express");
const { dbConnection } = require("./db");
dbConnection();
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

const app = express();
const port = 3000;

dbConnection();
app.use(express.json());
app.use("/", userRoute);
app.use("/", authRoute);

app.get("/", (req, res) => {
  res.json({ success: true, msg: "welcome" });
});

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
