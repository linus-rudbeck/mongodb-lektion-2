const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = process.env.MONGODB_URL;
const client = new MongoClient(connectionUrl);

const dbName = process.env.MONGODB_DATABASE;


/* ----- CARS ----- */

async function getCarsCollection() {
    await client.connect()
    const db = client.db(dbName);
    const collection = db.collection("cars");
    return collection;
}

module.exports.getCars = async () => {
    const collection = await getCarsCollection();
    const findResult = await collection.find({}).toArray();

    return findResult;
}

module.exports.insertCar = async (newCar) => {
    const collection = await getCarsCollection();

    await collection.insertOne(newCar);
}

module.exports.getCarById = async (id) => {
    const objectId = new ObjectId(id);
    const collection = await getCarsCollection();
    const car = await collection.findOne({ _id: objectId });
    return car;
}

module.exports.updateCarById = async (id, updatedCar) => {
    const objectId = new ObjectId(id);
    const collection = await getCarsCollection();
    await collection.updateOne({ _id: objectId }, { $set: updatedCar });
}

module.exports.deleteCarById = async (id) => {
    const objectId = new ObjectId(id);
    const collection = await getCarsCollection();
    await collection.deleteOne({_id: objectId})
}


module.exports.getCarsByOwnerId = async (ownerId) => {
    const objectId = new ObjectId(ownerId);

    const collection = await getCarsCollection();
    const findResult = await collection.find({ownerId: objectId}).toArray();

    return findResult;
}

/* ----- / CARS ----- */


/* ----- PEOPLE ----- */

async function getPeopleCollection() {
    await client.connect()
    const db = client.db(dbName);
    const collection = db.collection("people");
    return collection;
}

module.exports.getPeople = async () => {
    const collection = await getPeopleCollection();
    const findResult = await collection.find({}).toArray();

    return findResult;
}

module.exports.getPersonById = async (id) => {
    const objectId = new ObjectId(id);
    const collection = await getPeopleCollection();
    const person = await collection.findOne({ _id: objectId });
    return person;
}

module.exports.insertPerson = async (newPerson) => {
    const collection = await getPeopleCollection();

    await collection.insertOne(newPerson);
}

module.exports.updatePersonById = async (id, updatedPerson) => {
    const objectId = new ObjectId(id);
    const collection = await getPeopleCollection();
    await collection.updateOne({ _id: objectId }, { $set: updatedPerson });
}

module.exports.deletePersonById = async (id) => {
    const objectId = new ObjectId(id);
    const collection = await getPeopleCollection();
    await collection.deleteOne({_id: objectId})
}

/* ----- / PEOPLE ----- */