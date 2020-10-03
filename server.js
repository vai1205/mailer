const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

//app
const app = express();

//routes
const formRoutes = require("./routes/form");

//middleWares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL
    })
  );
}

// routes middleware
app.use("/api",formRoutes)
app.use("/test", (req, res)=>{
  res.send("running")
})

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
