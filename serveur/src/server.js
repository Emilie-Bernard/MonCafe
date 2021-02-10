const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
const cors = require('cors');
const app = express();
const passport = require("passport");

// Routes
const users = require("./routes/api/users");
const shops = require("./routes/api/shops");
const products = require("./routes/api/products");

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.use(multipart());
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/shops", shops);
app.use("/api/products", products);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));