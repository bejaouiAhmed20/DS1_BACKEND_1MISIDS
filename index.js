const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projetRoutes = require("./routes/projetRoutes");
const tacheRoutes = require("./routes/tacheRoutes");

// Charge les variables d'environnement depuis le fichier .env
dotenv.config();

const app = express();

// 3malna traitement automatiquement le corps des requêtes en JSON
app.use(express.json());

// Connexion à la base de données MongoDB
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projets', projetRoutes);
app.use('/api/taches', tacheRoutes);

const PORT = process.env.PORT || 5000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});