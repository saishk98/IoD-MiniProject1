document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search"); // Search input field
    const filterCheckboxes = document.querySelectorAll("input[type='checkbox']"); // All filter checkboxes //////////////////// we want this to query only the clasification checkboxes and then another variable for all the archetype checkboxes
    const classificationCheckboxes = document.querySelectorAll(".classification-filters"); // Classification checkboxes
    const yearCheckboxes = document.querySelectorAll(".year-filters");
    const gameGrid = document.getElementById("gameGrid"); // The game grid container

    let games = []; // Array to store game data from JSON

    // Fetch games from games.json
    fetch("games.json")
        .then((response) => response.json())
        .then((data) => {
            games = data.games; // Access the "games" array
            displayGames(games); // Initial display of all games
        })
        .catch((error) => console.error("Error fetching games:", error));

    // Function to display games
    function displayGames(filteredGames) {
        gameGrid.innerHTML = ""; // Clear the grid
        filteredGames.forEach((game) => {
            const gameContainer = document.createElement("div");
            gameContainer.className = "gameImageContainer";
            gameContainer.dataset.tags = `${game.classification} ${game.year} ${game.name}`;
            gameContainer.dataset.category = `${game.classification} ${game.year} ${game.name}`;

            gameContainer.innerHTML = `
                <img src="${game.image}" alt="${game.name}">
                <p>${game.name}</p>
            `;

            gameGrid.appendChild(gameContainer);
        });
    }

    // Function to filter characters based on search and checkboxes
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

            return matchesSearch && (matchesClassification || matchesYear);
        });

        console.log("Filtered games:", filteredGames);
        displayGames(filteredGames);
    } 
    

    // Event listeners for search bar, checkboxes, and year range inputs
    searchInput.addEventListener("input", filterGames); // Trigger filter on search input
    filterCheckboxes.forEach((checkbox) =>
        checkbox.addEventListener("change", filterGames) // Trigger filter on checkbox state change
    );

    // Optional: Toggle filter sections
    window.toggleFilter = function (sectionId) {
        const section = document.getElementById(sectionId);
        section.style.display = section.style.display === "none" ? "block" : "none";
    };
});

// Additional code to load games into a separate grid
document.addEventListener('DOMContentLoaded', () => {
    fetch('games.json')
        .then(response => response.json())
        .then(data => {
            const gamesGrid = document.getElementById('gamesGrid'); // Ensure this ID exists in your HTML
            data.games.forEach(game => {
                const gameDiv = document.createElement('div');
                gameDiv.classList.add('game-item');
                gameDiv.setAttribute('data-classification', game.classification);
                gameDiv.setAttribute('data-year', game.year);

                gameDiv.innerHTML = `
                    <img src="${game.image}" alt="${game.name}">
                    <p>${game.name}</p>
                `;
                gamesGrid.appendChild(gameDiv);
            });
        })
        .catch(error => console.error('Error loading games:', error));
});