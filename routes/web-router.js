const express = require('express');
const router = express.Router();

const db = require('./../database/mongodb')

router.get("/", async (req, res) => {
    const cars = await db.getCars();

    res.render("home", { cars }) // {cars : cars}
});


router.get("/new-car", (req, res) => {
    res.render("new-car")
});


router.post("/new-car", async (req, res) => {
    const newCar = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
    };

    await db.insertCar(newCar)

    res.redirect("/")
});


router.get("/cars/:id", async (req, res) => {
    const id = req.params.id;
    const car = await db.getCarById(id);

    res.render("edit-car", { car })
});


router.post("/edit-car/:id", async (req, res) => {
    const updatedCar = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
    };

    const id = req.params.id;
    await db.updateCarById(id, updatedCar);

    res.redirect("/");
});


router.post("/delete-car/:id", async (req, res) => {
    const id = req.params.id;

    await db.deleteCarById(id);

    res.redirect("/")
});

module.exports = router;