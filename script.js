const apiUrl = "http://127.0.0.1:5000"; // Flask API base URL

// Add Flavor
document.getElementById("addFlavorForm").addEventListener("submit", async (e) => {
    e.preventDefault();  // Prevent the form from reloading the page

    // Get form data
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const is_seasonal = document.getElementById("is_seasonal").checked;

    // Send the data to Flask backend using a POST request
    const response = await fetch(`${apiUrl}/add_flavor`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, is_seasonal }),  // Send data as JSON
    });

    const data = await response.json();
    alert(data.message);  // Show success message from Flask backend
});

// Get Flavors (View all flavors)
document.getElementById("getFlavorsBtn").addEventListener("click", async () => {
    const response = await fetch(`${apiUrl}/flavors`);
    const flavors = await response.json();
    const flavorsList = document.getElementById("flavorsList");
    flavorsList.innerHTML = "";  // Clear the current list

    // Loop through the flavors and display them in a list
    flavors.forEach((flavor) => {
        const li = document.createElement("li");
        li.textContent = `${flavor[1]} - ${flavor[2]}`;  // Display the flavor name and description
        flavorsList.appendChild(li);  // Add it to the list
    });
});

// Add Inventory Item
document.getElementById("addInventoryForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const ingredient_name = document.getElementById("ingredient_name").value;
    const quantity = document.getElementById("quantity").value;

    const response = await fetch(`${apiUrl}/add_inventory`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredient_name, quantity }),
    });

    const data = await response.json();
    alert(data.message);  // Show success message from Flask backend
});

// Get Inventory
document.getElementById("getInventoryBtn").addEventListener("click", async () => {
    const response = await fetch(`${apiUrl}/inventory`);
    const inventory = await response.json();
    const inventoryList = document.getElementById("inventoryList");
    inventoryList.innerHTML = "";

    // Loop through inventory items and display them in a list
    inventory.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item[1]}: ${item[2]}`;  // Display the ingredient and quantity
        inventoryList.appendChild(li);
    });
});

// Add Customer Suggestion
document.getElementById("addSuggestionForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const flavor_name = document.getElementById("flavor_name").value;
    const customer_name = document.getElementById("customer_name").value;
    const allergy_concerns = document.getElementById("allergy_concerns").value;

    const response = await fetch(`${apiUrl}/add_suggestion`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ flavor_name, customer_name, allergy_concerns }),
    });

    const data = await response.json();
    alert(data.message);  // Show success message from Flask backend
});

// Get Customer Suggestions
document.getElementById("getSuggestionsBtn").addEventListener("click", async () => {
    const response = await fetch(`${apiUrl}/suggestions`);
    const suggestions = await response.json();
    const suggestionsList = document.getElementById("suggestionsList");
    suggestionsList.innerHTML = "";

    // Loop through customer suggestions and display them in a list
    suggestions.forEach((suggestion) => {
        const li = document.createElement("li");
        li.textContent = `${suggestion[1]} - ${suggestion[2]} (Allergy: ${suggestion[3]})`;
        suggestionsList.appendChild(li);
    });
});

// Add Allergen
document.getElementById("addAllergenForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const allergen_name = document.getElementById("allergen_name").value;

    const response = await fetch(`${apiUrl}/add_allergen`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify([{ allergen_name }]),
    });

    const data = await response.json();
    alert(data.message);  // Show success message from Flask backend
});

// Get Allergens
document.getElementById("getAllergensBtn").addEventListener("click", async () => {
    const response = await fetch(`${apiUrl}/allergens`);
    const allergens = await response.json();
    const allergensList = document.getElementById("allergensList");
    allergensList.innerHTML = "";

    // Loop through allergens and display them in a list
    allergens.forEach((allergen) => {
        const li = document.createElement("li");
        li.textContent = allergen[1];
        allergensList.appendChild(li);
    });
});
// Add to Cart
document.getElementById("addToCartForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const flavor_name = document.getElementById("cart_flavor_name").value; // Input for flavor name

    const response = await fetch(`${apiUrl}/add_to_cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ flavor_name }),
    });

    const data = await response.json();
    alert(data.message);  // Show success message
});

// Get Cart
document.getElementById("getCartBtn").addEventListener("click", async () => {
    const response = await fetch(`${apiUrl}/cart`);
    const cartData = await response.json();
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    // Display cart items
    cartData.cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        cartList.appendChild(li);
    });
});
