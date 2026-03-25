const mongodb = require('mongodb');

let client;
let db;
let recipes;

// connecting to database
async function connectDatabase() {
    try {
        client = new mongodb.MongoClient('mongodb+srv://user:user%401256@salma12.04p91.mongodb.net/');
        
        await client.connect();

        db = client.db('infs3201_fall2025');

        recipes = db.collection('recipes');

        console.log('Database connected');

    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

module.exports = {
    connectDatabase,
    getDB: () => db,
    getRecipes: () => recipes
};