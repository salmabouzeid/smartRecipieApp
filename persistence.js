const mongodb = require('mongodb');

let client;
let db;
let recipes;

// connecting to database
async function connectDatabase() {
    try {
        client = new mongodb.MongoClient(process.env.MONGO_URI);
        
        await client.connect();

        db = client.db('smartRecipie');

        recipes = db.collection('recipes');

        console.log('Database connected');

    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

function getRecipesCollection() {
    return recipes;
}


module.exports = {
    connectDatabase,getRecipesCollection,
    getDB: () => db,
    getRecipes: () => recipes
};