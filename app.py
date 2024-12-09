from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS  # type: ignore # Import CORS for cross-origin requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

DATABASE = 'ice_cream_cafe.db'

# Initialize the database and create required tables
def init_db():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.executescript('''
        CREATE TABLE IF NOT EXISTS flavors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            is_seasonal BOOLEAN
        );
        CREATE TABLE IF NOT EXISTS inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ingredient_name TEXT NOT NULL,
            quantity INTEGER
        );
        CREATE TABLE IF NOT EXISTS allergens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            allergen_name TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS customer_suggestions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            flavor_name TEXT NOT NULL,
            customer_name TEXT,
            allergy_concerns TEXT
        );
        ''')
        conn.commit()

# Add Flavor
@app.route('/add_flavor', methods=['POST'])
def add_flavor():
    data = request.json  # Get the data from the request body
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO flavors (name, description, is_seasonal) VALUES (?, ?, ?)",
                       (data['name'], data['description'], data['is_seasonal']))
        conn.commit()
    return jsonify({'message': 'Flavor added successfully!'})

# Get Flavors
@app.route('/flavors', methods=['GET'])
def get_flavors():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM flavors")
        flavors = cursor.fetchall()
    return jsonify(flavors)

# Add Inventory Item
@app.route('/add_inventory', methods=['POST'])
def add_inventory():
    data = request.json
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO inventory (ingredient_name, quantity) VALUES (?, ?)",
                       (data['ingredient_name'], data['quantity']))
        conn.commit()
    return jsonify({'message': 'Inventory item added successfully!'})

# Get Inventory
@app.route('/inventory', methods=['GET'])
def get_inventory():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM inventory")
        inventory = cursor.fetchall()
    return jsonify(inventory)

# Add Customer Suggestion
@app.route('/add_suggestion', methods=['POST'])
def add_suggestion():
    data = request.json
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO customer_suggestions (flavor_name, customer_name, allergy_concerns) VALUES (?, ?, ?)",
                       (data['flavor_name'], data['customer_name'], data['allergy_concerns']))
        conn.commit()
    return jsonify({'message': 'Customer suggestion added successfully!'})

# Get Customer Suggestions
@app.route('/suggestions', methods=['GET'])
def get_suggestions():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM customer_suggestions")
        suggestions = cursor.fetchall()
    return jsonify(suggestions)

# Add Allergen
@app.route('/add_allergen', methods=['POST'])
def add_allergen():
    data = request.json
    if not isinstance(data, list):  # Ensure the data is an array
        return jsonify({'error': 'Data should be an array of allergens'}), 400
    for allergen in data:
        if not allergen.get('allergen_name'):  # Validate that allergen name is provided
            return jsonify({'error': 'Allergen name is required for each item'}), 400
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        for allergen in data:
            cursor.execute("INSERT INTO allergens (allergen_name) VALUES (?)", (allergen['allergen_name'],))
        conn.commit()
    return jsonify({'message': 'Allergens added successfully!'})

# Get Allergens
@app.route('/allergens', methods=['GET'])
def get_allergens():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM allergens")
        allergens = cursor.fetchall()
    return jsonify(allergens)

cart = []  # In-memory cart storage

@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.json  # Get the flavor ID or name from the request
    cart.append(data['flavor_name'])
    return jsonify({'message': f"'{data['flavor_name']}' added to cart successfully!", 'cart': cart})

@app.route('/cart', methods=['GET'])
def get_cart():
    return jsonify({'cart': cart})

@app.route('/')
def home():
    return "Welcome to the Ice Cream Parlor!"

if __name__ == '__main__':
    init_db()  # Initialize the database
    app.run(debug=True)  # Start the Flask app