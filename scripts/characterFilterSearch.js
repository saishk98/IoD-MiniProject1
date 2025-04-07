document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const classificationCheckboxes = document.querySelectorAll(".classification-filters");
    const archetypeCheckboxes = document.querySelectorAll(".archetype-filters");
    const characterGrid = document.getElementById("characterGrid");

    let characters = [];

    // Fetch characters from JSON
    fetch("characters.json")
        .then((response) => response.json())
        .then((data) => {
            characters = data.characters;
            displayCharacters(characters); // Show all characters initially
        })
        .catch((error) => console.error("Error fetching characters:", error));

    // Function to display characters
    function displayCharacters(filteredCharacters) {
        characterGrid.innerHTML = ""; // Clear grid
        filteredCharacters.forEach((character) => {
            const characterContainer = document.createElement("div");
            characterContainer.className = "characterImageContainer";
            characterContainer.dataset.classification = character.classification;
            characterContainer.dataset.archetype = character.archetype;

            characterContainer.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <p>${character.name}</p>
            `;

            characterGrid.appendChild(characterContainer);
        });
    }

    // Function to filter characters based on search and checkboxes
    function filterCharacters() {
        const searchTerm = searchInput.value.toLowerCase();

        // Get selected classifications
        const selectedClassifications = Array.from(classificationCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        // Get selected archetypes
        const selectedArchetypes = Array.from(archetypeCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        console.log("Selected classifications:", selectedClassifications);
        console.log("Selected archetypes:", selectedArchetypes);

        // Apply filters
        const filteredCharacters = characters.filter((character) => {
            const matchesSearch = character.name.toLowerCase().includes(searchTerm);
            const matchesClassification = selectedClassifications.length === 0 || selectedClassifications.includes(character.classification);
            const matchesArchetype = selectedArchetypes.length === 0 || selectedArchetypes.includes(character.archetype);

            return matchesSearch && matchesClassification && matchesArchetype;
        });

        console.log("Filtered characters:", filteredCharacters);
        displayCharacters(filteredCharacters);
    }

    // Event listeners for search bar and checkboxes
    searchInput.addEventListener("input", filterCharacters);
    classificationCheckboxes.forEach((checkbox) => checkbox.addEventListener("change", filterCharacters));
    archetypeCheckboxes.forEach((checkbox) => checkbox.addEventListener("change", filterCharacters));
});

// Toggle filter visibility
function toggleFilter(sectionId) {
    const section = document.getElementById(sectionId);
    section.style.display = section.style.display === "none" ? "block" : "none";
}
