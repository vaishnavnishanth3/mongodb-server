import {MongoClient} from "mongodb";

let dbConnection;

export function connectToDatabase(cb) {
    MongoClient.connect('mongodb://localhost:27017/bookStore')
    .then((client) => {
        dbConnection = client.db()
        return cb()
    })
    .catch(error => {
        console.log(error)
        return cb(error)
    })
}

export function getDB() {
    return dbConnection
}