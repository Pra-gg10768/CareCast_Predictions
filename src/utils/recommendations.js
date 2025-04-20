export function getSuggestions(model, prediction) {
    const lower = prediction.toLowerCase();
  
    if (model === "diabetes") {
      return lower.includes("not")
        ? ["👍 Keep maintaining a healthy diet and exercise regularly."]
        : [
            "🥗 Adopt a balanced, low-sugar diet.",
            "🏃 Increase physical activity – aim for 30 mins a day.",
            "💧 Stay hydrated and monitor blood sugar levels regularly.",
          ];
    }
  
    if (model === "heart") {
      return lower.includes("not")
        ? ["👍 Keep up the heart-healthy habits!"]
        : [
            "💓 Reduce saturated fats and increase omega-3 intake.",
            "🚶 Aim for 150 minutes of moderate exercise weekly.",
            "🧘 Manage stress with meditation or yoga.",
            "🚭 Avoid smoking and limit alcohol intake.",
          ];
    }
  
    if (model === "hypertension") {
      return lower.includes("not")
        ? ["👍 Blood pressure looks good – keep monitoring it."]
        : [
            "🧂 Reduce sodium intake in your meals.",
            "🏋️‍♂️ Maintain a healthy weight through diet & exercise.",
            "🥦 Eat potassium-rich foods like bananas, avocados, and spinach.",
            "😴 Prioritize 7–8 hours of sleep per night.",
          ];
    }
  
    return [];
  }
  