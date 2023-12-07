require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");

const { authRoutes, authenticator } = require("./auth/auth");
const { apiRoutes } = require("./api/api");
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use([express.json(), express.urlencoded({ extended: true })]);

const sessionStore = new MongoStore({
  mongoUrl: process.env.MONGODB_URL_AUTH,
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
app.use("/api", [authenticator, apiRoutes]);

app.listen(PORT, () => {
  console.log(`server is running on port :${PORT} `);
});
