document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const classificationCheckboxes = document.querySelectorAll(".classification-filters");
    const yearCheckboxes = document.querySelectorAll(".year-filters");
    const gameGrid = document.getElementById("gamesGrid");

    let games = [];

    // Fetch games from JSON
    fetch("games.json")
        .then((response) => response.json())
        .then((data) => {
            games = data.games;
            displayGames(games); // Show all games initially
        })
        .catch((error) => console.error("Error fetching games:", error));

    // Function to display games
    function displayGames(filteredGames) {
        gameGrid.innerHTML = ""; // Clear grid
        filteredGames.forEach((game) => {
            const gameContainer = document.createElement("div");
            gameContainer.className = "game-item";
            gameContainer.dataset.classification = game.classification;
            gameContainer.dataset.year = game.year;

            gameContainer.innerHTML = `
                <img src="${game.image}" alt="${game.name}">
                <p>${game.name}</p>
            `;

            gameGrid.appendChild(gameContainer);
        });
    }

    // Function to filter games based on search and checkboxes
    function filterGames() {
        const searchTerm = searchInput.value.toLowerCase();

        // Get selected classifications
        const selectedClassifications = Array.from(classificationCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        // Get selected years
        const selectedYears = Array.from(yearCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        console.log("Selected classifications:", selectedClassifications);
        console.log("Selected years:", selectedYears);

        // Apply filters
        const filteredGames = games.filter((game) => {
            const matchesSearch = game.name.toLowerCase().includes(searchTerm);
            const matchesClassification = selectedClassifications.length === 0 || selectedClassifications.includes(game.classification);
            const matchesYear = selectedYears.length === 0 || selectedYears.includes(game.year);

            return matchesSearch && matchesClassification && matchesYear; // Apply filters correctly
        });

        console.log("Filtered games:", filteredGames);
        displayGames(filteredGames);
    }

    // Event listeners for search bar and checkboxes
    searchInput.addEventListener("input", filterGames);
    classificationCheckboxes.forEach((checkbox) => checkbox.addEventListener("change", filterGames));
    yearCheckboxes.forEach((checkbox) => checkbox.addEventListener("change", filterGames));
});

// Toggle filter visibility
function toggleFilter(sectionId) {
    const section = document.getElementById(sectionId);
    section.style.display = section.style.display === "none" ? "block" : "none";
}
