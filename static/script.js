async function generateRecipe() {

    const ingredients = document.getElementById("ingredients").value;
    const result = document.getElementById("result");

    if (ingredients.trim() === "") {
        result.innerHTML = `
            <div class="recipe-card">
                <h3>⚠ Please enter some ingredients.</h3>
            </div>
        `;
        return;
    }

    result.innerHTML = `
        <div class="recipe-card">
            <h2>🍳 Generating Your Recipe...</h2>
            <p>Please wait a few seconds 🤖</p>
        </div>
    `;

    try {

        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ingredients: ingredients
            })
        });

        const data = await response.json();

        if (data.recipe) {

            result.innerHTML = `
                <div class="recipe-card">
                    <h2>🍽 Your AI Recipe</h2>
                    <pre>${data.recipe}</pre>

                    <button onclick="copyRecipe()">
                        📋 Copy Recipe
                    </button>
                </div>
            `;

        } else {

            result.innerHTML = `
                <div class="recipe-card">
                    <h3>❌ Error</h3>
                    <p>${data.error}</p>
                </div>
            `;

        }

    } catch (error) {

        result.innerHTML = `
            <div class="recipe-card">
                <h3>⚠ Something went wrong.</h3>
                <p>${error}</p>
            </div>
        `;

    }

}

function copyRecipe() {

    const text = document.querySelector("pre").innerText;

    navigator.clipboard.writeText(text);

    alert("✅ Recipe copied successfully!");
}
document.getElementById("ingredients").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        generateRecipe();
    }
});
function clearRecipe() {
    document.getElementById("ingredients").value = "";
    document.getElementById("result").innerHTML = "";
}
function clearRecipe() {
    document.getElementById("ingredients").value = "";
    document.getElementById("result").innerHTML = "";
}