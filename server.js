import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express();
dotenv.config();


//Middlewares
app.use(cors());

// Para dados JSON (ex: APIs)
app.use(express.json({ 
  limit: '50mb'  // Aumenta o limite para 50MB
}));
app.use(express.urlencoded({ 
  limit: '50mb', 
  extended: true  // Permite objetos aninhados
}));

app.use(express.static('public'));

// Conexão com o Banco
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Error:', err.message));

//importo Rotas
import reportRoute from './routes/report.js';
import userRoute from './routes/user.js'; 

// Rotas
app.use('/report', reportRoute);
app.use('/user', userRoute); 

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));