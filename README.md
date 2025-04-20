
# CareCast 🩺💻

**CareCast** is a healthcare-focused web application designed to help users predict their risk of common health conditions like diabetes, heart disease, and hypertension. It uses machine learning models to provide predictions based on user input and offers personalized lifestyle suggestions for health improvement.

---

## 🚀 Features

- **Diabetes Prediction**: Based on 8 key medical features.
- **Heart Disease Prediction**: Based on 13 medical features.
- **Hypertension Prediction**: Based on 4 important factors.
- **Personalized Suggestions**: After each prediction, personalized lifestyle tips are displayed to help improve health.
- **User-Friendly UI**: Intuitive forms and interactive notifications.
- **Real-Time Predictions**: Fast model predictions backed by a Flask-based API.

---

## 🖥️ Technologies Used

- **Frontend**:
  - React.js
  - Tailwind CSS
  - Axios for API communication

- **Backend**:
  - Flask
  - Python
  - Machine Learning Models (trained using scikit-learn and joblib)

- **Deployment**:
  - Backend: Render, Heroku, or other cloud platforms
  - Frontend: Vercel

---

## 📦 Installation Guide

### 1. Clone the Repository

To get started with CareCast, clone the repository:

```bash
git clone https://github.com/yourusername/carecast.git
cd carecast
```

### 2. Install Backend Dependencies

Navigate to the backend folder and install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

- **Backend** dependencies are listed in `requirements.txt`. If using a virtual environment, make sure it's activated.

### 3. Run the Backend

To start the Flask API locally, run:

```bash
python app.py
```

This will start the API on `http://localhost:5000`.

### 4. Install Frontend Dependencies

Navigate to the frontend folder:

```bash
cd frontend
npm install
```

### 5. Run the Frontend

To start the React app locally:

```bash
npm start
```

This will start the React app on `http://localhost:3000`.

---

## 🌐 How to Use

1. **Go to the website**: After running the app locally or accessing the deployed website.
2. **Enter Your Details**: Input your medical data into the form fields.
3. **Click "Predict"**: After submitting, the model will predict if you have a particular health risk (Diabetes, Heart Disease, or Hypertension).
4. **View Results and Suggestions**: The app will provide the prediction result and offer suggestions to improve health.

---

## ⚙️ API Endpoints

Here are the available API endpoints:

- **Diabetes Prediction**:
  - `POST /predict/diabetes`
  - Input data: `{ "pregnancies": <value>, "glucose": <value>, "bloodPressure": <value>, ... }`
  - Returns: Prediction result (`1` for diabetes, `0` for no diabetes).

- **Heart Disease Prediction**:
  - `POST /predict/heart`
  - Input data: `{ "age": <value>, "sex": <value>, "cp": <value>, ... }`
  - Returns: Prediction result (`1` for heart disease, `0` for no heart disease).

- **Hypertension Prediction**:
  - `POST /predict/hypertension`
  - Input data: `{ "age": <value>, "bmi": <value>, "sodium": <value>, "potassium": <value> }`
  - Returns: Prediction result (`1` for hypertension, `0` for no hypertension).

---

## 📝 Working Behind the App

### 1. User Input and Frontend Interaction
When users access the web application, they are presented with a form where they can enter medical data such as age, glucose levels, BMI, etc. This data is collected and sent to the backend API (Flask) via a POST request. The React frontend uses Axios to make HTTP requests and receive the predictions.

### 2. Backend API (Flask)
The Flask application listens for requests at specific endpoints like `/predict/diabetes`, `/predict/heart`, and `/predict/hypertension`. The backend accepts the user input in JSON format, processes it, and uses pre-trained machine learning models to predict the likelihood of each health condition.

**Example**: When a user submits their data for heart disease prediction, the backend extracts the features from the data and passes them to the trained `heart_disease_model.pkl` (a machine learning model).

The model returns a prediction (either `1` or `0`), which is then sent back to the frontend.

The backend code is structured as follows:
```python
# Load pre-trained models
diabetes_model = joblib.load("diabetes_model.pkl")
heart_model = joblib.load("heart_disease_model.pkl")
hypertension_model = joblib.load("hypertension_model.pkl")
```

### 3. Machine Learning Models
- **Diabetes Model**: A logistic regression model trained on features such as glucose, BMI, and age to predict whether someone has diabetes.
- **Heart Disease Model**: A random forest model trained using factors like age, cholesterol levels, and heart rate to predict the presence of heart disease.
- **Hypertension Model**: A support vector machine (SVM) model trained on factors like BMI, age, and sodium levels to predict the risk of hypertension.

### 4. Prediction Results
Once the backend receives the input data and passes it to the model, the result is returned as a binary value:

- `1` for a positive prediction (e.g., diabetes present).
- `0` for a negative prediction (e.g., no diabetes).

The frontend receives the result and displays it, along with personalized lifestyle suggestions generated based on the prediction. The suggestions include health tips and lifestyle changes to help mitigate health risks.

### 5. Personalized Suggestions
For each condition, if a positive prediction is made, the app provides lifestyle suggestions. These tips are defined in the `getSuggestions` function on the frontend. For instance:

**Hypertension Suggestions**:
- Lower sodium intake.
- Exercise regularly to maintain a healthy weight.
- Reduce stress.

### 6. Notifications
The app displays notifications using the `showNotification` function, which provides feedback to the user about the status of their prediction and results.

---

## 📈 Machine Learning Models
This project includes pre-trained models for predicting:

- **Diabetes** using logistic regression.
- **Heart Disease** using random forest.
- **Hypertension** using support vector machine (SVM).

The models are saved as `.pkl` files and are loaded dynamically in the Flask app.

---

