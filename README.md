
# Ice Cream Parlor Management System

The Ice Cream Parlor Management System is a web-based application to manage an ice cream parlor's inventory, flavors, customer suggestions, allergens, and cart functionality. The app provides a backend API powered by Flask and a user-friendly frontend.

# Features
1 Flavor Management:
Add, view, update, and delete flavors.

2 Inventory Management:
Manage ingredients and quantities.

3 Customer Suggestions:
Allow customers to suggest new flavors with allergy concerns.

4 Allergen Management:
Add and view allergens for customer safety.

5 Favorite Cart:
Maintain a cart of favorite products for easy access.

# Technologies Used
Frontend: HTML, CSS, JavaScript

Backend: Flask (Python)

Database: SQLite

Styling Framework: Custom CSS

Cross-Origin Resource Sharing: Flask-CORS

# Project Setup

Prerequisites

Python 3.x installed

pip (Python package installer)

A modern web browser

# Usage
Flavor Management

Add flavors using the form in the "Add Flavor" section.View all flavors using the "Get Flavors" button.

Inventory Management

Add ingredients and quantities in the "Add Inventory Item" section.View the inventory list using the "Get Inventory" button.

Customer Suggestions

Submit new flavor suggestions with allergy concerns in the "Add Customer Suggestion" section.
View all suggestions using the "Get Suggestions" button.

Allergens

Add allergens in the "Add Allergen" section.
View all allergens using the "Get Allergens" button.

Cart Management

Add flavors to the cart using the "Add to Cart" section.
View your favorite products in the cart using the "Get Cart" button.


Local Development Setup
Clone the Repository:

git clone https://github.com/your-repository-name.git
cd ice_cream_parlor

Set Up the Backend:

Create and activate a virtual environment:
python -m venv venv
source venv/bin/activate  # On Linux/MacOS
venv\Scripts\activate     # On Windows

Install required Python packages:
pip install flask flask-cors

Start the Flask server:
python app.py
The server will run at http://127.0.0.1:5000.

Open the Frontend:

Open index.html in your browser to use the application.
Using Docker
Build and Run the Docker Container
Build the Docker Image:

docker build -t ice_cream_parlor .

Run the Container:
docker run -d -p 5000:5000 ice_cream_parlor

Access the Application:
Backend: Open http://127.0.0.1:5000 in a browser or Postman.
Frontend: Open index.html in your browser.


ice_cream_parlor/

├── assets/

     │   └── background.jpg           # Background image for styling

├── app.py                       # Backend (Flask application)

├── index.html                   # Frontend HTML file

├── styles.css                   # Styling for the application

├── script.js                    # Frontend JavaScript functionality

├── README.md                    # Project documentation

├── Dockerfile   

└── ice_cream_cafe.db            # SQLite database (auto-created)

