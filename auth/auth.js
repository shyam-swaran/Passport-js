require("./passport");
const authRoutes = require("express").Router();
const passport = require("passport");
const User = require("../model/User");
const { generatePassword } = require("./passwordUtils");

//Local Login
authRoutes.post("/login", passport.authenticate("local"), (req, res) => {
  res.send("successfully logged in");
});

//Google Login
authRoutes.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/auth/failed",
    successRedirect: "http://localhost:3000/auth/success",
  })
);

//Facebook Login
authRoutes.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
authRoutes.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/auth/failed",
    successRedirect: "http://localhost:3000/auth/success",
  })
);

//Twitter Login
authRoutes.get("/twitter", passport.authenticate("twitter"));
authRoutes.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "http://localhost:3000/auth/failed",
    successRedirect: "http://localhost:3000/auth/success",
  })
);

authRoutes.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  const user = new User({
    username: username,
    email: email,
    password: await generatePassword(password),
  });

  try {
    const taken = await User.findOne({ username: username });
    if (taken) return res.status(404).json({ error: "Username Already Taken" });
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

authRoutes.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) return res.send(err);
  });
  return res.send("logged out");
});
const authenticator = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(404).send("err");
  }
  next();
};
module.exports = { authenticator, authRoutes };
