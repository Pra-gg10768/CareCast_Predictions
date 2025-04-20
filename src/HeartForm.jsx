import { useState } from "react";
import axios from "axios";
import './FormStyles.css';
import { getSuggestions } from "./utils/recommendations";

export default function HeartForm() {
  const [formData, setFormData] = useState({
    age: 0,
    sex: 0,
    cp: 0,
    trestbps: 0,
    chol: 0,
    fbs: 0,
    restecg: 0,
    thalach: 0,
    exang: 0,
    oldpeak: 0,
    slope: 0,
    ca: 0,
    thal: 0,
  });

  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to show notification
  const showNotification = (message, isError = false) => {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    if (isError) {
      notification.classList.add("error");
    } else {
      notification.classList.remove("error");
    }

    // Show the notification with an animation
    notification.classList.add("show");

    // Hide the notification after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show");
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/predict/heart", formData);
      const prediction = res.data.prediction === 1 ? "🩺 Heart Disease Present" : "✅ No Heart Disease";
      setResult(prediction);
      setSuggestions(getSuggestions("heart", prediction));
      showNotification("Prediction complete. See results below!", false);
    } catch (error) {
      console.error("Error predicting:", error);
      setResult("Error getting prediction");
      setSuggestions([]);
      showNotification("There was an error with the prediction. Please try again.", true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-100 to-red-300 px-4">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-xl p-8 transition-all border border-gray-200">
        <h2 className="text-2xl font-extrabold text-center text-red-700 mb-6">Heart Disease Prediction</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {Object.keys(formData).map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-gray-800 mb-1 capitalize">{field}</label>
              <input
                type="number"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                step="any"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all shadow-md"
          >
            {isLoading ? "Predicting..." : "Predict Now"}
          </button>
        </form>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center mt-6">
            <div className="spinner w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Animated Result */}
        {result && !isLoading && (
          <div className="mt-6 text-center text-lg font-semibold text-red-800 animate-fade-in">
            Result: {result}
          </div>
        )}

        {/* Animated Suggestions */}
        {suggestions.length > 0 && !isLoading && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg shadow-inner animate-fade-in">
            <h3 className="text-red-700 font-semibold mb-2">Lifestyle Suggestions</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              {suggestions.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Notification */}
        <div id="notification" className="notification">Your prediction was successful!</div>
      </div>
    </div>
  );
}
