async function getRecipe() {
  const ingredients = document.getElementById("ingredients").value;

  if (!ingredients) {
    alert("Please enter ingredients!");
    return;
  }

  document.getElementById("result").innerHTML = "Loading... ⏳";

  try {
    const response = await fetch("http://localhost:5000/generate", { // Updated URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });

    const data = await response.json();

    document.getElementById("result").innerHTML = `
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
    document.getElementById("result").innerHTML =
      "Error connecting to backend ❌";
  }
}