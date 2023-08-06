const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const { urlencoded } = require("body-parser");
const { populate } = require("dotenv");
const UserRouter = require("./route/user.route");
const ProfileRouter = require("./route/profile.route");
const app = express();
app.enable("proxy");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.options("*", cors());

app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       // scriptSrcElem:["'self'", "'unsafe-inline'"],
//       imgSrc: ["'self'", "*.pixabay.com"],
//     },
//   })
// );

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api/user", limiter);
app.use((req, res, next) => {
  console.log(`Route access: ${req.method} - ${req.originalUrl}`);
  next();
});
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use(compression());

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "success",
    data: {
      Hi: "Hello world",
      Name: "Pranay Salve",
      Message: "Welcome",
    },
  });
});

app.use("/api/user", UserRouter);
app.use("/api/profile", ProfileRouter);

module.exports = app;
