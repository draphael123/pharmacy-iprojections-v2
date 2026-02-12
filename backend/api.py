from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from pathlib import Path

app = Flask(__name__)
CORS(app)

# Load processed data
DATA_FILE = Path(__file__).parent / 'processed_data.json'

def load_data():
    """Load processed pharmacy data"""
    if not DATA_FILE.exists():
        return None
    
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

@app.route('/api/data', methods=['GET'])
def get_all_data():
    """Get all processed data"""
    data = load_data()
    if not data:
        return jsonify({'error': 'Data not found. Please run data_processor.py first'}), 404
    return jsonify(data)

@app.route('/api/pharmacies', methods=['GET'])
def get_pharmacies():
    """Get list of all pharmacies"""
    data = load_data()
    if not data:
        return jsonify({'error': 'Data not found'}), 404
    
    pharmacies = list(data['summary'].keys())
    return jsonify({'pharmacies': pharmacies})

@app.route('/api/pharmacy/<pharmacy_name>', methods=['GET'])
def get_pharmacy_data(pharmacy_name):
    """Get data for a specific pharmacy"""
    data = load_data()
    if not data:
        return jsonify({'error': 'Data not found'}), 404
    
    # Filter data for specific pharmacy
    weekly_data = [r for r in data['weekly_data'] if r['pharmacy'] == pharmacy_name]
    monthly_data = [r for r in data['monthly_data'] if r['pharmacy'] == pharmacy_name]
    summary = data['summary'].get(pharmacy_name, {})
    
    return jsonify({
        'pharmacy': pharmacy_name,
        'weekly_data': weekly_data,
        'monthly_data': monthly_data,
        'summary': summary
    })

@app.route('/api/pharmacy/<pharmacy_name>/sku/<sku>', methods=['GET'])
def get_sku_data(pharmacy_name, sku):
    """Get data for a specific SKU within a pharmacy"""
    data = load_data()
    if not data:
        return jsonify({'error': 'Data not found'}), 404
    
    # Filter data for specific pharmacy and SKU
    weekly_data = [r for r in data['weekly_data'] 
                   if r['pharmacy'] == pharmacy_name and r['sku'] == sku]
    
    return jsonify({
        'pharmacy': pharmacy_name,
        'sku': sku,
        'weekly_data': weekly_data
    })

@app.route('/api/summary', methods=['GET'])
def get_summary():
    """Get summary statistics for all pharmacies"""
    data = load_data()
    if not data:
        return jsonify({'error': 'Data not found'}), 404
    
    return jsonify(data['summary'])

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'data_available': DATA_FILE.exists()
    })

if __name__ == '__main__':
    print("Starting Pharmacy Projections API...")
    print(f"Data file location: {DATA_FILE}")
    print(f"Data file exists: {DATA_FILE.exists()}")
    app.run(debug=True, port=5000)

