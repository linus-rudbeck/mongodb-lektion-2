const express = require("express");
const exphbs = require("express-handlebars");
const { MongoClient, ObjectId } = require("mongodb")
var bodyParser = require('body-parser')


const connectionUrl = "mongodb://localhost:27017";
const client = new MongoClient(connectionUrl);

const dbName = "CarsCrudApp";

async function getCarsCollection() {
    await client.connect()
    const db = client.db(dbName);
    const collection = db.collection("cars");
    return collection;
}

const app = express();

app.engine('hbs', exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs"
}));

app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", async (req, res) => {
    const collection = await getCarsCollection();
    const findResult = await collection.find({}).toArray();

    res.render("home", { cars: findResult })
});

app.get("/new-car", (req, res) => {
    res.render("new-car")
});

app.post("/new-car", async (req, res) => {
    const newCar = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
    };

    const collection = await getCarsCollection();

    await collection.insertOne(newCar);

    res.redirect("/")
});

app.get("/cars/:id", async (req, res) => {
    const objectId = new ObjectId(req.params.id);
    const collection = await getCarsCollection();
    const car = await collection.findOne({ _id: objectId });

    res.render("edit-car", { car })
})



app.post("/edit-car/:id", async (req, res) => {
    const updatedCar = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
    };

    const objectId = new ObjectId(req.params.id);
    const collection = await getCarsCollection();
    await collection.updateOne({ _id: objectId }, { $set: updatedCar });

    res.redirect("/")
})

app.post("/delete-car/:id", async (req, res) => {
    const objectId = new ObjectId(req.params.id);
    const collection = await getCarsCollection();
    await collection.deleteOne({_id: objectId})

    res.redirect("/")
})

app.listen(8000, () => {
    console.log("http://localhost:8000/");
});