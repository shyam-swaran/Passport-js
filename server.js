require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");

const { authRoutes } = require("./auth/auth");
const todoApi = require("./TodoApi");
const PORT = 5000;

app.use([express.json(), express.urlencoded({ extended: true }), cors()]);

const sessionStore = new MongoStore({
  mongoUrl: "mongodb://127.0.0.1:27017/Auth",
  collectionName: "session",
});
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.session());
app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/api", todoApi);

app.listen(PORT, () => {
  console.log(`server is running on port :${PORT} `);
});
