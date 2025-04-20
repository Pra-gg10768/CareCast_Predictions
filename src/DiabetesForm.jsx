import { useState } from "react";
import axios from "axios";
import './FormStyles.css';
import { getSuggestions } from "./utils/recommendations";

export default function DiabetesForm() {
  const [formData, setFormData] = useState({
    pregnancies: 0,
    glucose: 0,
    bloodPressure: 0,
    skinThickness: 0,
    insulin: 0,
    bmi: 0,
    diabetesPedigreeFunction: 0,
    age: 0,
  });

  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to show notification
  const showNotification = (message, isError = false) => {
    const notification = document.getElementById("notification");
    notification.innerHTML = isError ? `❌ ${message}` : `✅ ${message}`;
    notification.classList.toggle("error", isError);
    notification.classList.add("show");

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
      const res = await axios.post("https://carecast-predictions-1.onrender.com/predict/diabetes", formData);
      const prediction = res.data.prediction === 1 ? "🩺 Diabetic" : "✅ Not Diabetic";
      setResult(prediction);
      setSuggestions(getSuggestions("diabetes", prediction));
      showNotification("Prediction complete! Scroll down to view results.");
    } catch (error) {
      console.error("Prediction error:", error);
      setResult("Error getting prediction");
      setSuggestions([]);
      showNotification("Something went wrong. Try again later.", true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 px-4">
      <div className="backdrop-blur-md bg-white/40 shadow-2xl rounded-3xl p-8 max-w-xl w-full transition-all border border-white/30">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Diabetes Predictor</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold capitalize text-gray-800 mb-1">
                {field}
              </label>
              <input
                type="number"
                name={field}
                step="any"
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm transition"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 rounded-xl text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg"
          >
            {isLoading ? "Predicting..." : "🔍 Predict Now"}
          </button>
        </form>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center mt-6">
            <div className="spinner w-10 h-10 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Animated Result Card */}
        {!isLoading && result && (
          <div className="mt-8 transition-opacity duration-500 animate-fade-in">
            <div className="bg-gradient-to-br from-[#444] to-[#333] border border-indigo-600 rounded-xl p-6 shadow-md text-center">
              <h3 className="text-lg text-indigo-500 font-semibold mb-2">🧾 Prediction Result</h3>
              <p className="text-xl font-bold text-white">{result}</p>
            </div>
          </div>
        )}

        {/* Animated Suggestions Card */}
        {!isLoading && suggestions.length > 0 && (
          <div className="mt-6 transition-all duration-500 animate-fade-in">
            <div className="bg-gradient-to-br from-[#3a3a3d] to-[#2a2a2d] border border-indigo-600 p-6 rounded-xl shadow-inner">
              <h3 className="text-indigo-500 font-semibold mb-2">💡 Lifestyle Suggestions</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                {suggestions.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Notification */}
        <div id="notification" className="notification">Prediction successful!</div>
      </div>
    </div>
  );
}
