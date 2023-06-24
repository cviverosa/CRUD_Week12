$(document).ready(function () {
  var recipeList = [];

  // Create Recipe button click event
  $("#create-new-recipe").click(function () {
    var recipeName = $("#new_recipe-name").val();
    if (recipeName !== "") {
      var recipe = new Recipe(recipeName);
      recipeList.push(recipe);
      displayRecipes();
      // Clear input fields
      $("#new_recipe-name").val("");
    }
  });

  // Delete Entire Recipe button click event
  $(document).on("click", ".delete-recipe", function () {
    var recipeIndex = $(this).data("recipe-index");
    recipeList.splice(recipeIndex, 1);
    displayRecipes();
  });

  // Add Ingredient button click event
  $(document).on("click", ".add-ingredient", function () {
    var recipeIndex = $(this).data("recipe-index");
    var ingredient = $("#addIngredient_" + recipeIndex).val();
    var amount = $("#addAmount_" + recipeIndex).val();
    if (ingredient !== "" && amount !== "") {
      recipeList[recipeIndex].addIngredient(ingredient, amount);
      displayRecipes();
    }
  });

  // Remove Ingredient button click event
  $(document).on("click", ".remove-ingredient", function () {
    var recipeIndex = $(this).data("recipe-index");
    var ingredientIndex = $(this).data("ingredient-index");
    recipeList[recipeIndex].removeIngredient(ingredientIndex);
    displayRecipes();
  });

  // Edit Ingredient button click event
  $(document).on("click", ".edit-ingredient", function () {
    var recipeIndex = $(this).data("recipe-index");
    var ingredientIndex = $(this).data("ingredient-index");
    var recipe = recipeList[recipeIndex];
    var ingredient = recipe.ingredients[ingredientIndex];

    var newName = prompt(
      "Enter the new name for the ingredient:",
      ingredient.name
    );
    var newAmount = prompt(
      "Enter the new amount for the ingredient:",
      ingredient.amount
    );

    if (newName !== null && newAmount !== null) {
      recipe.editIngredient(ingredientIndex, newName, newAmount);
      displayRecipes();
    }
  });

  // Display recipes and ingredients
  function displayRecipes() {
    // Clear the existing recipe table
    $("#recipe-table").empty();

    // Loop through each recipe in the recipeList
    for (var i = 0; i < recipeList.length; i++) {
      var recipe = recipeList[i];
      var recipeName = recipe.name;

      // Create the HTML elements for the recipe display
      var recipeSection = $("<div>", { class: "card mb-3" });
      var recipeHeader = $("<div>", {
        class: "card-header p-3 mb-2 bg-primary text-white",
      }).text(recipeName);
      var deleteButton = $("<button>", {
        class: "btn btn-danger delete-recipe",
        "data-recipe-index": i,
      }).text("Delete Recipe");
      var ingredientSection = $("<div>", { class: "card-body" });

      // Create the input fields for adding new ingredients
      var ingredientRow = $("<div>", { class: "row" });
      var ingredientCol = $("<div>", { class: "col" });
      var ingredientInput = $("<input>", {
        type: "text",
        id: "addIngredient_" + i,
        class: "form-control",
        placeholder: "Enter Ingredient",
      });
      var amountCol = $("<div>", { class: "col" });
      var amountInput = $("<input>", {
        type: "text",
        id: "addAmount_" + i,
        class: "form-control",
        placeholder: "Enter Amount",
      });
      var addButton = $("<button>", {
        class: "btn btn-info form control add-ingredient",
        style: "color:white",
        "data-recipe-index": i,
      }).text("Add Ingredient");
      var ingredientList = $("<ul>", { class: "list-group mt-3" });

      // Loop through each ingredient in the current recipe
      for (var j = 0; j < recipe.ingredients.length; j++) {
        var ingredient = recipe.ingredients[j];
        var ingredientItem = $("<li>", { class: "list-group-item" });
        var removeButton = $("<button>", {
          class: "btn btn-danger btn-sm float-right remove-ingredient",
          "data-recipe-index": i,
          "data-ingredient-index": j,
        }).text("Remove");
        var editButton = $("<button>", {
          class: "btn btn-success btn-sm float-right edit-ingredient",
          "data-recipe-index": i,
          "data-ingredient-index": j,
        }).text("Edit");

        // Set the text content of the ingredient item
        ingredientItem.text(ingredient.name + " - " + ingredient.amount);

        // Append the remove and edit buttons to the ingredient item
        ingredientItem.append(removeButton);
        ingredientItem.append(editButton);

        // Append the ingredient item to the ingredient list
        ingredientList.append(ingredientItem);
      }

      // Append the ingredient input fields and buttons to the ingredient section
      ingredientCol.append(ingredientInput);
      amountCol.append(amountInput);
      ingredientRow.append(ingredientCol);
      ingredientRow.append(amountCol);
      ingredientSection.append(ingredientRow);
      ingredientSection.append(addButton);
      ingredientSection.append(ingredientList);

      // Append the recipe header, delete button, and ingredient section to the recipe section
      recipeSection.append(recipeHeader);
      recipeSection.append(deleteButton);
      recipeSection.append(ingredientSection);

      // Append the recipe section to the recipe table
      $("#recipe-table").append(recipeSection);
    }
  }

  // Recipe class
  class Recipe {
    constructor(name) {
      this.name = name;
      this.ingredients = [];
    }

    addIngredient(name, amount) {
      const ingredient = new Ingredient(name, amount);
      this.ingredients.push(ingredient);
    }

    removeIngredient(index) {
      if (index >= 0 && index < this.ingredients.length) {
        this.ingredients.splice(index, 1);
      }
    }

    editIngredient(index, name, amount) {
      if (index >= 0 && index < this.ingredients.length) {
        const ingredient = this.ingredients[index];
        ingredient.name = name;
        ingredient.amount = amount;
      }
    }
  }

  // Ingredient class
  class Ingredient {
    constructor(name, amount) {
      this.name = name;
      this.amount = amount;
    }
  }
});
