const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Iteration 2 Recipe Object
const recipeObj = {
  title: "test recipe",
  level: "Amateur Chef",
  ingredients: [
      "1/2 cup rice vinegar",
      "5 tablespoons honey",
      "1/3 cup soy sauce (such as Silver Swan®)",
      "1/4 cup Asian (toasted) sesame oil",
      "3 tablespoons Asian chili garlic sauce",
      "3 tablespoons minced garlic",
      "salt to taste",
      "8 skinless, boneless chicken thighs"
    ],
    cuisine: "Asian",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    duration: 40,
    creator: "Chef LePapu"
  }

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  //Iteration 2 
  .then(() => {
    return Recipe.create(recipeObj)
      .then((results) => console.log(`Saved new recipe: ${results}`))
      .catch((err) => console.log(err));
  })
  //Iteration 3
  .then(() => {
    return Recipe.insertMany(data)
      .then((results) => console.log(`Saved new recipes: ${results}`))
      .catch((err) => console.log(err));
  })
  //Iteration 4 
  .then(() => {
    return Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
      .then(() => console.log('Updated recipe'))
      .catch((err) => console.log(err));
  })
  //Iteration 5 
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"})
      .then(() => console.log('Recipe deleted'))
      .catch((err) => console.log(err));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

//Iteration 6
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(`Mongo connection disconnected`);
    process.exit(0);
  });
});