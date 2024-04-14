import express from "express"
import { connectToDatabase, getDB } from "./db.js"
import { ObjectId } from "mongodb"

const app = express()
const port = 3001

let db

app.get('/books', (req,res) => {
    let books = [];
    
    db.collection('books')
    .find()
    .sort({author:1})
    .forEach(book=> books.push(book))
    .then(response => {res.status(200).json(books)})
    .catch((err) => {
        res.status(500).json({mssg: "Error fetching books with error " + err})
    })
})

app.get('/books/:id', (req,res) => {
    db.collection('books')
    .findOne({_id: ObjectId(req.params.id)})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({error: "Error fetching book"})
    })
});

connectToDatabase(err => {
    if (!err) {
        app.listen( port, () => {
            console.log(`Server is running on port ${port}`)
        })
        db = getDB()
    }
});