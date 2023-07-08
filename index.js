require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');

mongoose
  .connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.log('Error connecting to the database:', error);
  });

const database = mongoose.connection;
const app = express();

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});
app.use(cors());
app.use(express.json());
app.use('/', routes);

app.listen(process.env.PORT || 8000, (err) => {
  if (err) throw err;
  console.log('Server started');
});
