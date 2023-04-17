const express = require('express');
const router = express.Router();

const db = require('./../../database/mongodb')

router.get('/', async (req, res) => {

    const people = await db.getPeople();

    res.send(people);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const person = await db.getPersonById(id);

    res.send(person)
});

router.post('/', async (req, res) => {
    const newPerson = {
        name: req.body.name,
        birthYear: req.body.birthYear
    };

    await db.insertPerson(newPerson);

    res.sendStatus(201);
});

router.put('/:id', async (req, res) => {
    const updatedPerson = {
        name: req.body.name,
        birthYear: req.body.birthYear
    };

    const id = req.params.id;
    await db.updatePersonById(id, updatedPerson);

    res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    await db.deletePersonById(id);

    res.sendStatus(200);
});


router.get('/:id/cars', async (req, res) => {
    const id = req.params.id;
    const cars = await db.getCarsByOwnerId(id);

    res.send(cars);
});

module.exports = router;