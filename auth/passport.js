const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../model/User");
const { verifyPassword } = require("./passwordUtils");

const googleDevCreaditenial = {
  clientID: "535907436991-ebg5vaicl7p1hs7leoag9tib3autd0i6.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:5000/auth/google/callback",
  scope: ["profile", "email"],
};
const facebookDevCreaditenial = {
  clientID: "1046547593009266",
  clientSecret: "41910ae114c074cf9cd67c4869ec17c4",
  callbackURL: "http://localhost:5000/auth/facebook/callback",
  profileFields: ["id", "email", "displayName", "picture.type(large)"],
};
const GoogleStrategycallback = async (accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  const newUser = {
    username: profile.displayName,
    email: profile.emails[0].value,
    googleId: profile.id,
    profilePicUrl: profile.picture,
  };
  try {
    const user = await User.findOne({ googleId: profile.id });
    if (user) return cb(null, user);
    const newU = await User(newUser).save();
    return cb(null, newU);
  } catch (err) {
    cb(err);
  }
};
const FacebookStrategycallback = async (accessToken, refreshToken, profile, cb) => {
  const newUser = {
    username: profile.displayName,
    email: profile.emails[0].value,
    facebookId: profile.id,
    profilePicUrl: `http://graph.facebook.com/${profile.id}/picture?type=large&redirect=true&width=500&height=500`,
  };
  try {
    const user = await User.findOne({ facebookId: profile.id });
    if (user) return cb(null, user);
    const newU = await User(newUser).save();
    return cb(null, newU);
  } catch (err) {
    cb(err);
  }
  return cb(null, null);
};
const LocalStrategycallback = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      const isValid = verifyPassword(password, user.password);
      isValid.then((val) => {
        if (val) return done(null, user);
        return done(null, false);
      });
    })
    .catch((err) => {
      return done(err);
    });
};

passport.use(new FacebookStrategy(facebookDevCreaditenial, FacebookStrategycallback));
passport.use(new GoogleStrategy(googleDevCreaditenial, GoogleStrategycallback));
passport.use(new LocalStrategy(LocalStrategycallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});
