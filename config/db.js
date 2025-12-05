// 3malna Importation de la bibliothèque Mongoose
const mongoose = require("mongoose");

// Fonction asynchrone pour établir la connexion à la base de données MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Message de confirmation si la connexion réussit
    console.log("MongoDB connected");
  } catch (err) {

    // Affiche l'erreur en cas d'échec de la connexion
    console.error(err);

    // On va arreter complètement le processus avec un code d'erreur
    process.exit(1);
  }
};

module.exports = connectDB;
