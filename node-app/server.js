const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || "mongodb+srv://sireesha2622:****4@cluster0.ekefhyn.mongodb.net/task9?retryWrites=true&w=majority&appName=Cluster0&authSource=admin";

app.use(express.json());

let db;
MongoClient.connect(mongoUri, { useUnifiedTopology: true })
  .then(client => {
    db = client.db("libraryDb");
    app.listen(PORT, () => {
      console.log(`📚 Book Library API running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });

/**
 * Book Schema:
 * {
 *   title: string,
 *   author: string,
 *   year: number,
 *   genre: string
 * }
 */

// Create a book
app.post('/books', async (req, res) => {
  const { title, author, year, genre } = req.body;
  if (!title || !author) return res.status(400).json({ error: "Title and author are required." });

  const book = { title, author, year, genre, addedAt: new Date() };
  const result = await db.collection("books").insertOne(book);
  res.status(201).json({ _id: result.insertedId, title, author, year, genre });

});

// Get all books
app.get('/books', async (req, res) => {
  const books = await db.collection("books").find().toArray();
  res.json(books);
});

// Get a book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await db.collection("books").findOne({ _id: new ObjectId(req.params.id) });
    if (!book) return res.status(404).json({ error: "Book not found." });
    res.json(book);
  } catch {
    res.status(400).json({ error: "Invalid ID format." });
  }
});

// Update a book by ID
app.put('/books/:id', async (req, res) => {
  const { title, author, year, genre } = req.body;
  try {
    const result = await db.collection("books").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { title, author, year, genre, updatedAt: new Date() } }
    );
    res.json(result);
  } catch {
    res.status(400).json({ error: "Invalid ID format or update failed." });
  }
});

// Delete a book by ID
app.delete('/books/:id', async (req, res) => {
  try {
    await db.collection("books").deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(204).send();
  } catch {
    res.status(400).json({ error: "Invalid ID format or deletion failed." });
  }
});

// Health check
app.get('/health', (req, res) => res.send("OK"));
