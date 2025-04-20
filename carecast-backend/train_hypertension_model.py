# train_hypertension_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load your dataset (replace with your actual data)
df = pd.read_csv("hypertension.csv")

X = df[["age", "bmi", "sodium", "potassium"]]
y = df["hypertension"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, "hypertension_model.pkl")

print("Hypertension model trained and saved.")