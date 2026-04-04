async function getRecipe() {
  const ingredients = document.getElementById("ingredients").value.trim();
  const resultDiv = document.getElementById("result");


  if (!ingredients) {
    alert("Please enter ingredients!");
    return;
  }

  resultDiv.innerHTML = "Loading...";

  try {
    const response = await fetch("http://localhost:5000/generate", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });

    const data = await response.json();

    if (!response.ok) {
      resultDiv.innerHTML = `<p>${data.message || "Something went wrong"}</p>`;
      return;
    }

    resultDiv.innerHTML = `
      <h2>${data.title}</h2>
      <p><strong>Ingredients:</strong> ${data.ingredients}</p>
      <p><strong>Instructions:</strong></p>
      <ul>
        ${data.instructions.map((step) => `<li>${step}</li>`).join("")}
      </ul>
      <p><strong>Calories:</strong> ${data.calories}</p>
      <p><strong>Substitutions:</strong> ${data.substitutions}</p>
      <p><strong>Notes:</strong> ${data.notes}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>Could not connect to backend. Make sure Flask is running.</p>";
    console.error(error);
  }
}

async function loadRecipes() {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Loading recipes...";

  try {
    const response = await fetch("http://localhost:5000/recipes");
    const data = await response.json();

    if (!response.ok) {
      resultDiv.innerHTML = "<p>Failed to load recipes.</p>";
      return;
    }

    if (data.length === 0) {
      resultDiv.innerHTML = "<p>No recipes found.</p>";
      return;
    }

    resultDiv.innerHTML = data.map(recipe => `
      <div style="margin-bottom:20px; text-align:left;">
        <h2>${recipe.title}</h2>
        <p><strong>Calories:</strong> ${recipe.calories}</p>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
        <p><strong>Instructions:</strong></p>
        <ul>
          ${recipe.instructions.map(step => `<li>${step}</li>`).join("")}
        </ul>
        <p><strong>Notes:</strong> ${recipe.notes}</p>
        <hr>
      </div>
    `).join("");

  } catch (error) {
    resultDiv.innerHTML = "<p>Failed to load recipes.</p>";
    console.error(error);
  }
}