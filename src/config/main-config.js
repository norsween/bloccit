require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");
const passportConfig = require("./passport-config");

module.exports = {
   init(app, express){
     app.set("views", viewsFolder);
     app.set("view engine", "ejs");
     app.use(express.static(path.join(__dirname, "..", "assets")));
     app.use(bodyParser.urlencoded({ extended: true }));
     app.use(expressValidator());
     app.use(session({
   	secret: process.env.cookieSecret,
   	resave: false,
   	saveUninitialized: false,
   	cookie: { maxAge: 1.21e+9 } //set cookie to expire in 14 days
     }));
     app.use(flash());
     passportConfig.init(app);

     app.use((req,res,next) => {
       res.locals.currentUser = req.user;
       next();
     })
  }
};
