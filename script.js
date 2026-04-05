let currentRecipe = null;

async function getRecipe() {
  const ingredients = document.getElementById("ingredients").value.trim();
  const resultDiv = document.getElementById("result");


  if (!ingredients) {
    alert("Please enter ingredients!");
    return;
  }

  resultDiv.innerHTML = `<div class="message-box">Loading recipe...</div>`;

  try {
    const response = await fetch("/generate", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });

    const data = await response.json();

    if (!response.ok) {
      resultDiv.innerHTML = `<div class="message-box">${data.message || "Something went wrong."}</div>`;
      return;
    }

    currentRecipe = data;

    const ingredientsList = Array.isArray(data.ingredients)
      ? data.ingredients.join(", ")
      : data.ingredients || "N/A";

    const instructionsList = Array.isArray(data.instructions)
      ? data.instructions.map(step => `<li>${step}</li>`).join("")
      : `<li>${data.instructions || "No instructions available"}</li>`;

    const substitutionsList = Array.isArray(data.substitutions)
      ? data.substitutions.join(", ")
      : data.substitutions || "None";


    resultDiv.innerHTML = `
    <div class="recipe-card">
      <h2>${data.title|| "Recipe"}</h2>
      <p><strong>Ingredients:</strong> ${ingredientsList}</p>
      <p><strong>Instructions:</strong></p>
      <ul>${instructionsList}</ul>
      <p><strong>Calories:</strong> ${data.calories|| "N/A"}</p>
      <p><strong>Substitutions:</strong> ${substitutionsList}</p>
      <p><strong>Notes:</strong> ${data.notes|| ""}</p>
      <button class="save-btn" onclick="saveRecipe()">Save Recipe</button>
    </div>  
    `;
  } catch (error) {
    resultDiv.innerHTML = `<div class="message-box">Could not connect to backend.</div>`;
    console.error(error);
  }
}

async function saveRecipe() {
  if (!currentRecipe) {
    alert("No recipe to save yet.");
    return;
  }

  try {
    const response = await fetch("/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currentRecipe)
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to save recipe.");
      return;
    }

    alert("Recipe saved successfully!");
  } catch (error) {
    alert("Could not save recipe.");
    console.error(error);
  }
}

async function loadRecipes() {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<div class="message-box">Loading saved recipes...</div>`;

  try {
    const response = await fetch("http://localhost:5000/recipes");
    const data = await response.json();

    if (!response.ok) {
      resultDiv.innerHTML = `<div class="message-box">Failed to load recipes.</div>`;
      return;
    }

    if (data.length === 0) {
      resultDiv.innerHTML = `<div class="message-box">No recipes found.</div>`;
      return;
    }

    resultDiv.innerHTML = data.map(recipe => `
      <div class="recipe-card">
        <h2>${recipe.title}</h2>
        <p><strong>Calories:</strong> ${recipe.calories || "N/A"}</p>
        <p><strong>Ingredients:</strong>${
          Array.isArray(recipe.ingredients)
            ? recipe.ingredients.join(", ")
            : recipe.ingredients || "N/A"
        }</p>
        <p><strong>Instructions:</strong></p>
        <ul>
          ${
            Array.isArray(recipe.instructions)
              ? recipe.instructions.map(step => `<li>${step}</li>`).join("")
              : `<li>${recipe.instructions || "No instructions available"}</li>`
          }
        </ul>
      <p><strong>Substitutions:</strong> ${
          Array.isArray(recipe.substitutions)
            ? recipe.substitutions.join(", ")
            : recipe.substitutions || "None"
        }</p>
        <p><strong>Notes:</strong> ${recipe.notes || ""}</p>
      </div>
    `).join("");

  } catch (error) {
    resultDiv.innerHTML = `<div class="message-box">Failed to load recipes.</div>`;
    console.error(error);
  }
}