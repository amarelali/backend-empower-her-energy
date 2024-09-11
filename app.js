const path = require("path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const connectDB = require("./utils/db");
const userRoutes = require("./routes/userRoutes");

connectDB();
require("./config/googleAuth");

app.use(express.json());
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

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/success");
  }
);

// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "index.html"));
// });
app.use("/api", userRoutes);

const port = 5000 || process.env.PORT;

// Start the server
app.listen(port, () => {
  console.log(`Node.js HTTP server is running on port ${port}`);
});
