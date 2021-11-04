const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/routes')
const app = express()
const port = 8080

// Middlewares
app.use(express.json())

// MongoDB
mongoose.connect('mongodb+srv://toto:123456789toto@sportogether.jeriw.mongodb.net/sportogether?retryWrites=true&w=majority',{
  useNewUrlParser : true,
  useUnifiedTopology: true
})
const db = mongoose.connection;
db.on("error",console.error.bind(console, "Erreur de connexion à Mongo : "));
db.once("open", function () {
  console.log("Connexion à Mongo OK");
})



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Run at http://localhost:${port}`)
})

