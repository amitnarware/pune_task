const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employeeRoutes'); // Import routes

const app = express();
app.use(express.json());

const mongoURI = 'mongodb://127.0.0.1:27017/PuneTask';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use(employeeRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
