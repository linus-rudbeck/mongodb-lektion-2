require('dotenv').config()
const express = require("express");
const exphbs = require("express-handlebars");
var bodyParser = require('body-parser');

const webRouter = require('./routes/web-router')
const carsApiRouter = require('./routes/api/cars-api-router');
const peopleApiRouter = require('./routes/api/people-api-router');

const app = express();

app.engine('hbs', exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs"
}));

app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use("/", webRouter);
app.use("/api/cars", carsApiRouter);
app.use("/api/people", peopleApiRouter);

app.listen(8000, () => {
    console.log("http://localhost:8000/");
});