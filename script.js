function getRecipe() {
  const ingredients = document.getElementById("ingredients").value;

  if (!ingredients) {
    alert("Please enter ingredients!");
    return;
  }

  document.getElementById("result").innerHTML = "Loading... ⏳";

  setTimeout(() => {
    document.getElementById("result").innerHTML =
      "<h2>Sample Recipe</h2>" +
      "<p><strong>Ingredients:</strong> " + ingredients + "</p>" +
      "<p><strong>Instructions:</strong> Mix everything and cook.</p>";
  }, 1000);
}