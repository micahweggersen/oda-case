from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_caching import Cache
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration for caching
cache_config = {
    "CACHE_TYPE": "SimpleCache",  # Use in-memory caching
    "CACHE_DEFAULT_TIMEOUT": 300  # Cache timeout in seconds
}
app.config.from_mapping(cache_config)
cache = Cache(app)

# Route for /proxy/oda/query
@app.route("/proxy/oda/query", methods=["GET"])
@cache.cached(query_string=True)  # Cache responses based on query parameters
def proxy_oda_query():
    query = request.args.get("q")
    if not query:
        return jsonify({"error": "Missing query parameter"}), 400

    try:
        # Forward the request to the ODA API
        response = requests.get(f"https://oda.com/api/v1/search/mixed/?q={query}")
        response.raise_for_status()  # Raise an error for bad status codes
        return jsonify(response.json())  # Return the ODA API response
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500

# Route for /proxy/oda/all
@app.route("/proxy/oda/all", methods=["GET"])
@cache.cached()  # Cache the response without query parameters
def proxy_oda_all():
    try:
        # Forward the request to the ODA API without a query parameter
        response = requests.get("https://oda.com/api/v1/search/mixed/?q=")
        response.raise_for_status()  # Raise an error for bad status codes
        return jsonify(response.json())  # Return the ODA API response
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route("/proxy/oda/filter", methods=["GET"])
@cache.cached(query_string=True)  # Cache responses based on query parameters
def proxy_oda_filter():
    query = request.args.get("q")
    filters = request.args.get("filters")
    if not query:
        return jsonify({"error": "Missing query parameter"}), 400

    try:
        # Forward the request to the ODA API
        print(f"https://oda.com/api/v1/search/mixed/?type=product&q={query}&filters={filters}")
        response = requests.get(f"https://oda.com/api/v1/search/mixed/?type=product&q={query}&filters={filters}")
        response.raise_for_status()  # Raise an error for bad status codes
        return jsonify(response.json())  # Return the ODA API response
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)
