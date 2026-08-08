from flask import Flask, render_template, request, jsonify
from google import genai
from dotenv import load_dotenv
import os

# Load API key from .env
load_dotenv()

app = Flask(__name__)

# Gemini Client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Home Page
@app.route("/")
def home():
    return render_template("index.html")


# Generate Recipe
@app.route("/generate", methods=["POST"])
def generate():
    try:
        data = request.get_json()

        ingredients = data.get("ingredients")

        prompt = f"""
You are an expert chef and nutrition assistant.

Create a delicious recipe using ONLY these ingredients:

{ingredients}

Return the answer in the following format.

🍳 Recipe Name

📖 Description:
Write 2-3 lines about the recipe.

🥗 Ingredients:
- List all ingredients used.

👨‍🍳 Steps:
1. Step one
2. Step two
3. Continue until complete.

⏱ Cooking Time:
Mention the approximate cooking time.

🔥 Difficulty:
Easy / Medium / Hard

🍽 Servings:
Mention how many people it serves.

💡 Chef's Tip:
Give one useful cooking tip.

🥗 Nutrition Information:
• Calories
• Protein
• Carbohydrates
• Fat

Rules:
- Make the recipe easy to understand.
- Use simple cooking instructions.
- Don't use unnecessary ingredients.
- Keep the response clean and well formatted.
"""

        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=prompt
        )

        return jsonify({
            "recipe": response.text
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)