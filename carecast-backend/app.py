import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load all models
diabetes_model = joblib.load("diabetes_model.pkl")
heart_model = joblib.load("heart_disease_model.pkl")
hypertension_model = joblib.load("hypertension_model.pkl")

@app.route("/predict/diabetes", methods=["POST"])
def predict_diabetes():
    data = request.get_json()
    features = [
        data["pregnancies"], data["glucose"], data["bloodPressure"],
        data["skinThickness"], data["insulin"], data["bmi"],
        data["diabetesPedigreeFunction"], data["age"]
    ]
    prediction = diabetes_model.predict([np.array(features)])
    return jsonify({"prediction": int(prediction[0])})

@app.route("/predict/heart", methods=["POST"])
def predict_heart():
    data = request.get_json()
    features = [
        data["age"], data["sex"], data["cp"], data["trestbps"],
        data["chol"], data["fbs"], data["restecg"], data["thalach"],
        data["exang"], data["oldpeak"], data["slope"], data["ca"],
        data["thal"]
    ]
    prediction = heart_model.predict([np.array(features)])
    return jsonify({"prediction": int(prediction[0])})

@app.route("/predict/hypertension", methods=["POST"])
def predict_hypertension():
    data = request.get_json()
    features = [
        data["age"], data["bmi"], data["sodium"], data["potassium"]
    ]
    prediction = hypertension_model.predict([np.array(features)])
    return jsonify({"prediction": int(prediction[0])})

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 10000))  # Use environment variable or default to 10000
    app.run(debug=True, host='0.0.0.0', port=port)
