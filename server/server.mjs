const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/business_cards', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.use(cors());
app.use(bodyParser.json());

const cardSchema = new mongoose.Schema({
    name: String,
    description: String,
    linkedin: String,
    twitter: String,
    otherSocialMedia: String,
    interests: [String],
});

const Card = mongoose.model('Card', cardSchema);

// Create a new card
app.post('/cards', async (req, res) => {
    try {
        const newCard = new Card(req.body);
        await newCard.save();
        res.status(201).send(newCard);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all cards
app.get('/cards', async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).send(cards);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a card
app.put('/cards/:id', async (req, res) => {
    try {
        const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!card) {
            return res.status(404).send();
        }
        res.status(200).send(card);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a card
app.delete('/cards/:id', async (req, res) => {
    try {
        const card = await Card.findByIdAndDelete(req.params.id);
        if (!card) {
            return res.status(404).send();
        }
        res.status(200).send(card);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
