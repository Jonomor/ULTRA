from flask import Flask, request, jsonify
import os
import joblib

app = Flask(__name__)

# Try to load model
model = None
model_path = 'trade_predictor.joblib'

if os.path.exists(model_path):
    model = joblib.load(model_path)
else:
    print("⚠️ Warning: No model found at startup!")

@app.route('/predict', methods=['POST'])
def predict():
    global model
    if model is None:
        return jsonify({'error': 'Model not available, please retrain first.'}), 500

    data = request.get_json()
    features = [
        data['atrEntry'],
        data['volumeAtEntry'],
        data['volumeSpike'],
        data['priceVsMA'],
        data['confidence'],
        data['fallbackActive']
    ]
    prediction = model.predict([features])[0]
    return jsonify({'prediction': int(prediction)})

# Hot reload trigger
@app.route('/reload', methods=['POST'])
def reload_model():
    global model
    try:
        model = joblib.load(model_path)
        return jsonify({'success': True, 'message': 'Model reloaded successfully!'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(port=5005)

from flask_cors import CORS
CORS(app)
