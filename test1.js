const { MongoClient, ObjectId } = require('mongodb');

const connectionUrl = "mongodb://localhost:27017";
const client = new MongoClient(connectionUrl);

const dbName = "CarsCrudApp";

async function main(){
    console.log("Connected!");
    await client.connect()
    const db = client.db(dbName);
    const collection = db.collection("cars");

    await updateCar(collection);
    await findAllCars(collection);

    return "done!";
}


async function addNewCar(collection){
    const newCar = {
        make: "Saab",
        model: "9000",
        year: 1999
    };

    const result = await collection.insertOne(newCar);

    console.log({result});
}

async function findAllCars(collection){
    const findResult = await collection.find({}).toArray();
    console.log({findResult});
}

async function updateCar(collection){
    const objectId = new ObjectId("64342a0f8457288aaacb57e7")
    const updateResult = await collection.updateOne({ _id: objectId }, { $set: { distance: 10000 } });
    console.log({updateResult});
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());