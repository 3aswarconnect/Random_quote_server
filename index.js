const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors=require('cors')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Quote model
const QuoteSchema = new mongoose.Schema({
  id: Number,
  quote: String,
  author: String,
});

const Quote = mongoose.model('Quote', QuoteSchema);

// Routes
app.get('/quotes', async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json({ quotes });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
