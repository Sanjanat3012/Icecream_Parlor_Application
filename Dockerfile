# Use Python base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy all application files into the container
COPY . .

# Install necessary Python dependencies
RUN pip install --no-cache-dir flask flask-cors

# Expose the Flask app port
EXPOSE 5000

# Run the Flask application
CMD ["python", "app.py"]
