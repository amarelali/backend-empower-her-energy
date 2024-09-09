const path = require("path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const connectDB = require("./utils/db");
const userRoutes = require("./routes/userRoutes");

connectDB();
require("./googleAuth");

app.use(express.json());
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.sendStatus(401); // Unauthorized
  }
app.use(
  session({
    secret: "keyboard",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "index.html"));
// });

app.use("/api", userRoutes);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/auth/protected",isLoggedIn, (req, res) => {
  let name = req.name.displayName;
  res.send(`You have successfully authenticated with Google! ${name}`);
});

app.get("/auth/google/failure", (req, res) => {
  res.send("something went wrong!");
});

const port = 5000 || process.env.PORT;

// Start the server
app.listen(port, () => {
  console.log(`Node.js HTTP server is running on port ${port}`);
});
