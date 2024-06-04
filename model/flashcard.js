const mongoose = require('mongoose');

// create a schema
const flashcardSchema = new mongoose.Schema({
    _id: String,
    question: String,
    answer: String
    }); // create a model

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

module.exports = Flashcard;