const express = require('express');
require('dotenv').config();
const app = express();
const cors= require('cors');
const { connectDatabase, getRecipesCollection } = require('./persistence');
connectDatabase();

app.use(express.json());
app.use(cors());
//routes
app.get('/', (req, res) => {
    res.send('Backend is running');
});


app.get('/test', (req, res) => {
    res.json({ status: "ok" });
});

//the generate 


app.post('/generate', async (req, res) => {
    try {
        const { ingredients } = req.body;

        // Check that ingredients were provided
        if (!ingredients) {
            return res.status(400).json({ message: 'Ingredients are required' });
        }

        // AI INTEGRATION GOES HERE
        // Later, the AI developer can replace the placeholder recipe below
        // 
        // const recipe = await generateRecipeWithAI(ingredients);
        //
        // The AI response should return a recipe object with:
        // - title
        // - ingredients
        // - instructions
        // - calories
        // - substitutions
        // - notes

        // Temporary response for testing
        const recipe = {
            title: 'Simple Recipe',
            ingredients: ingredients,
            instructions: [
                'Prepare the ingredients.',
                'Cook or mix them as needed.',
                'Serve and enjoy.'
            ],
            calories: 'Will be calculated later',
            substitutions: [
                'Alternative ingredients will be suggested later'
            ],
            notes: 'This is a placeholder response until AI integration is added.'
        };

        res.status(200).json(recipe);

    } catch (error) {
        res.status(500).json({ message: 'Error generating recipe' });
    }
});

// Save a recipe to MongoDB
app.post('/recipes', async (req, res) => {
    try {
        const { title, ingredients, instructions, calories, substitutions, notes } = req.body;

        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ message: 'Title, ingredients, and instructions are required' });
        }

        const recipe = {
            title,
            ingredients,
            instructions,
            calories: calories || 'Not provided',
            substitutions: substitutions || [],
            notes: notes || '',
            createdAt: new Date()
        };

        const recipesCollection = getRecipesCollection();
        const result = await recipesCollection.insertOne(recipe);

        res.status(201).json({
            message: 'Recipe saved successfully',
            recipeId: result.insertedId,
            recipe: recipe
        });

    } catch (error) {
        res.status(500).json({ message: 'Error saving recipe' });
    }
});

// Retrieve all recipes from MongoDB
app.get('/recipes', async (req, res) => {
    try {
        const recipesCollection = getRecipesCollection();
        const allRecipes = await recipesCollection.find().toArray();

        res.status(200).json(allRecipes);

    } catch (error) {
        res.status(500).json({ message: 'Error retrieving recipes' });
    }
});


//handlers
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});


//ports
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});