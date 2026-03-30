const express = require('express');
const app = express();
const { connectDatabase } = require('./persistence');

connectDatabase();

app.use(express.json());

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


//handlers
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});


//ports
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});