const path = require("path");

const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const expressSession = require("express-session");

require("dotenv").config();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
};

function verifyCallback(accesToken, refreshToken, profile, done) {
  console.log("Google profile", profile);

  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to cookie
passport.serializeUser((user, done) => {
  console.log(user.id);
  done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser((obj, done) => {
  console.log(obj);
  done(null, obj);
});

const app = express();

app.use(helmet());
app.use(
  expressSession({
    secret: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) {
  const isLoggedIn = req.user && req.isAuthenticated();

  if (!isLoggedIn) {
    return res.status(401).json({
      error: "you must login",
    });
  }

  next();
}

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true,
  }),
  (req, res) => {
    //res.redirect("/");
    console.log("google called us back!");
  }
);

app.get("/failure", (req, res) => {
  return res.send("failed to log in!");
});

app.get("/auth/logout", (req, res) => {
  req.logOut(() => {
    res.redirect("/");
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/secret", checkLoggedIn, (req, res) => {
  res.send(`the secret code is "nomames"`);
});
module.exports = app;
