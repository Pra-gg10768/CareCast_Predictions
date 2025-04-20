import { useState } from "react";
import axios from "axios";
import { getSuggestions } from "./utils/recommendations";
import './FormStyles.css';

export default function HypertensionForm() {
  const [formData, setFormData] = useState({
    age: 0,
    bmi: 0,
    sodium: 0,
    potassium: 0,
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
      const res = await axios.post("https://carecast-predictions-1.onrender.com/predict/hypertension", formData);
      const prediction = res.data.prediction === 1 ? "🩺 Hypertension Present" : "✅ No Hypertension";
      setResult(prediction);
      setSuggestions(getSuggestions("hypertension", prediction));
      
      // Show success notification
      showNotification("Prediction complete! Check the results and suggestions.", false);
    } catch (error) {
      console.error("Error predicting:", error);
      setResult("Error getting prediction");
      setSuggestions([]);
      
      // Show error notification
      showNotification("There was an error with the prediction. Please try again.", true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 transition-all">
        <h2 className="text-2xl font-extrabold text-purple-700 mb-6 text-center">Hypertension Risk Predictor</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {Object.keys(formData).map((field) => (
            <div key={field}>
              <label className="block mb-1 text-sm font-medium text-gray-700 capitalize">
                {field}
              </label>
              <input
                type="number"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                step="any"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-medium py-2 rounded-lg hover:bg-purple-700 transition duration-200 shadow-md"
          >
            {isLoading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center mt-6">
            <div className="spinner w-10 h-10 border-4 border-gray-300 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Animated Result */}
        {result && !isLoading && (
          <div className="mt-6 text-center text-lg font-semibold text-purple-800 animate-fade-in">
            Result: {result}
          </div>
        )}

        {/* Animated Suggestions */}
        {suggestions.length > 0 && !isLoading && (
          <div className="mt-6 bg-purple-100 border-l-4 border-purple-500 p-4 rounded-xl shadow-inner animate-fade-in">
            <h3 className="text-purple-700 font-semibold mb-2">Personalized Lifestyle Suggestions</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              {suggestions.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Notification that will pop up */}
      <div id="notification" className="notification">
        Your prediction was successful!
      </div>
    </div>
  );
}
