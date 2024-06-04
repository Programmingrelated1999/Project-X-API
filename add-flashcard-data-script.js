const fs = require('fs').promises;

// Function to generate unique ID
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // Generate random alphanumeric ID
}

const flashcards = [];

async function processFlashcards(basePath) {
  try {
    const files = await fs.readdir(basePath); // Read directory contentss

    for (const file of files) {
      const id = generateId();

      if (file.includes('que')) {
        // Index = number between ans and que
        // Flashcard with question and answer
        const parts = [file.slice(0, file.indexOf("que")), file.slice(file.indexOf("que"))];
        const answerPath = `resources/flashcards/${parts[0]}.PNG`
        if (parts.length === 2) {
          flashcards.push({ _id: id, question: `resources/flashcards/${file}`, answer: answerPath }); // Use relative paths for question and answer
        }
      }
    }

    console.log(flashcards);
  } catch (err) {
    console.error(err);
  }
}

// Example usage (assuming the script is in the same directory as the flashcards folder)
const basePath = './resources/flashcards'; // Replace with the relative path to your flashcards folder
processFlashcards(basePath)

// connect to MongoDb 
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:ProjectXAdmin123@project-x.wkgu1a4.mongodb.net/?retryWrites=true&w=majority&appName=Project-X', { useNewUrlParser: true, useUnifiedTopology: true });

// creat a model Flashcard
const flashcardSchema = new mongoose.Schema({
  _id: String,
  question: String,
  answer: String
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

async function saveFlashcards(flashcards) {
    for (const flashcard of flashcards) {
      console.log("Saving flashcard");
      await new Flashcard(flashcard).save(); // Use await with save()
    }
  }

  async function main() {
    await processFlashcards(basePath);
    await saveFlashcards(flashcards); // Use await with saveFlashcards()
    mongoose.connection.close();
  }

  main();
