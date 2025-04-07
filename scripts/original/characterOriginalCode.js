document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search"); // Search input field
    const filterCheckboxes = document.querySelectorAll(".filter-options input[type='checkbox']"); // All filter checkboxes //////////////////// we want this to query only the clasification checkboxes and then another variable for all the archetype checkboxes
  //   const archetypeCheckboxes = document.querySelectorAll(".archetype-checkbox")
  //   const classifciationCheckbox = document.querySelectorAll(".calssification-checbox")
    const characterGrid = document.getElementById("characterGrid"); // The character grid container
  
    let characters = []; // Array to store character data from JSON
  
    // Fetch characters from characters.json
    fetch("characters.json")
        .then((response) => response.json())
        .then((data) => {
            characters = data.characters; // Access the "characters" array
            displayCharacters(characters); // Initial display of all characters
        })
        .catch((error) => console.error("Error fetching characters:", error));
  
    // Function to display characters
    function displayCharacters(filteredCharacters) {
        characterGrid.innerHTML = ""; // Clear the grid
        filteredCharacters.forEach((character) => {
            const characterContainer = document.createElement("div");
            characterContainer.className = "characterImageContainer";
            characterContainer.dataset.tags = `${character.classification} ${character.archetype} ${character.name}`;
            characterContainer.dataset.category = `${character.classification} ${character.archetype} ${character.name}`;
  
            characterContainer.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <p>${character.name}</p>
            `;
  
            characterGrid.appendChild(characterContainer);
        });
    }
  
    // Function to filter characters based on search and checkboxes
    function filterCharacters() {
        const searchTerm = searchInput.value.toLowerCase(); // Get the search term
        const selectedFilters = Array.from(filterCheckboxes)
            .filter((checkbox) => checkbox.checked) // Get selected checkboxes
            .map((checkbox) => checkbox.value); // Extract their values
  
            console.log('characters', characters, selectedFilters)
        const filteredCharacters = characters.filter((character) => {
            const matchesSearch = character.name.toLowerCase().includes(searchTerm); // Matches the search term
            const matchesFilters =
                selectedFilters.length === 0 || // No filter applied
                selectedFilters.includes(character.classification) || // Matches classification
                selectedFilters.includes(character.archetype); // Matches archetype
  
                if(matchesFilters && matchesSearch){
                    console.log('matches searched', matchesSearch, matchesFilters, character)
                  return true
                } else {
                  return false
                }
          //   return matchesSearch && matchesFilters;
        });
  
        displayCharacters(filteredCharacters); // Update the character grid
    }

    // Function to filter characters based on search and checkboxes
    function filterCharacters() {
        const searchTerm = searchInput.value.toLowerCase(); // Get the search term
        const selectedFilters = Array.from(filterCheckboxes)
            .filter((checkbox) => checkbox.checked) // Get selected checkboxes
            .map((checkbox) => checkbox.value); // Extract their values
    
            console.log('characters', characters, selectedFilters)
        const filteredCharacters = characters.filter((character) => {
            const matchesSearch = character.name.toLowerCase().includes(searchTerm); // Matches the search term
            const matchesFilters =
                selectedFilters.length === 0 || // No filter applied
                selectedFilters.includes(character.classification) && // Matches classification
                selectedFilters.includes(character.archetype); // Matches archetype
    
                if(matchesFilters && matchesSearch){
                    console.log('matches searched', matchesSearch, matchesFilters, character)
                    return true
                } else {
                    return false
                }
            //   return matchesSearch && matchesFilters;
        });
    
        displayCharacters(filteredCharacters); // Update the character grid
    }
  
    // Event listeners for search bar and checkboxes
    searchInput.addEventListener("input", filterCharacters); // Trigger filter on search input
    filterCheckboxes.forEach((checkbox) =>
        checkbox.addEventListener("change", filterCharacters) // Trigger filter on checkbox state change
    );
  
    // Optional: Toggle filter sections
    window.toggleFilter = function (sectionId) {
        const section = document.getElementById(sectionId);
        section.style.display = section.style.display === "none" ? "block" : "none";
    };
  });
  



  

  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search"); // Search input field
    const filterCheckboxes = document.querySelectorAll("input[type='checkbox']"); // All filter checkboxes //////////////////// we want this to query only the clasification checkboxes and then another variable for all the archetype checkboxes
    const classificationCheckboxes = document.querySelectorAll(".classification-filters");
    const archetypeCheckboxes = document.querySelectorAll(".archetype-filters");
    const characterGrid = document.getElementById("characterGrid"); // The character grid container
  
    let characters = []; // Array to store character data from JSON
  
    // Fetch characters from characters.json
    fetch("characters.json")
        .then((response) => response.json())
        .then((data) => {
            characters = data.characters; // Access the "characters" array
            displayCharacters(characters); // Initial display of all characters
        })
        .catch((error) => console.error("Error fetching characters:", error));
  
    // Function to display characters
    function displayCharacters(filteredCharacters) {
        characterGrid.innerHTML = ""; // Clear the grid
        filteredCharacters.forEach((character) => {
            const characterContainer = document.createElement("div");
            characterContainer.className = "characterImageContainer";
            characterContainer.dataset.tags = `${character.classification} ${character.archetype} ${character.name}`;
            characterContainer.dataset.category = `${character.classification} ${character.archetype} ${character.name}`;
  
            characterContainer.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <p>${character.name}</p>
            `;
  
            characterGrid.appendChild(characterContainer);
        });
    }

    function getAllCheckedValuesFromElement(selectors) {
        return Array.from(selectors)
        .filter((checkbox) => checkbox.checked) // Get selected checkboxes
        .map((checkbox) => checkbox.value); // Extract their values
    }
  
    // Function to filter characters based on search and checkboxes
    function filterCharacters() {
        const searchTerm = searchInput.value.toLowerCase(); // Get the search term
        const selectedFilters = getAllCheckedValuesFromElement(filterCheckboxes)
            console.log('selectedFilters', selectedFilters)

        const classificationFilters = getAllCheckedValuesFromElement(classificationCheckboxes);
        const archetypeFilters = getAllCheckedValuesFromElement(archetypeCheckboxes);

        console.log('classification filters', classificationFilters)
        console.log('archetype filters', archetypeFilters)
    
        console.log('characters', characters, selectedFilters)
        const filteredCharacters = characters.filter((character) => {
        const matchesSearch = character.name.toLowerCase().includes(searchTerm); // Matches the search term
        const matchesFilters =
                selectedFilters.length === 0 || // No filter applied
                selectedFilters.includes(character.classification) && // Matches classification
                selectedFilters.includes(character.archetype); // Matches archetype
                
            // --- another attemped
            const combinedCheckBoxFilter = selectedFilters.filter((selectedItem) => {
                if(classificationFilters.includes(selectedItem) || archetypeFilters.includes(selectedItem) ){
                    return true
                } else {
                    false
                }
            })
        // console.log('~~~~', combinedCheckBoxFilter)
    
        const isClassification = classificationFilters.includes(character.classification)
        const isArchetype = archetypeFilters.includes(character.archetype)

        console.log('check', classificationCheckboxes, isClassification, archetypeCheckboxes, isArchetype)

        if(classificationCheckboxes.length > 0 && archetypeCheckboxes.length > 0){
            if((isClassification) && (isArchetype)) {
                return true;
            } else {
                return false;
            }
        }

        if(classificationCheckboxes.length > 0 && archetypeCheckboxes.length === 0){
            if(isClassification){
                return true;
            } else {
                return false;
            }
        }

        if(classificationCheckboxes.length === 0 && archetypeCheckboxes.length > 0){
            if(archetypeCheckboxes){
                return true;
            } else{
                return false;
            }
        }



        
                // if((combinedCheckBoxFilter.includes(character.classification) && combinedCheckBoxFilter.includes(character.archetype)) && matchesSearch){
                //     // console.log('matches searched', matchesSearch, matchesFilters, character)
                //     return true
                // } else {
                //     return false
                // }
            //   return matchesSearch && matchesFilters;
        });
        console.log('filtered characters', filteredCharacters)
    
        displayCharacters(filteredCharacters); // Update the character grid
    }
    
  
    // Event listeners for search bar and checkboxes
    searchInput.addEventListener("input", filterCharacters); // Trigger filter on search input
    filterCheckboxes.forEach((checkbox) =>
        checkbox.addEventListener("change", filterCharacters) // Trigger filter on checkbox state change
    );
  
    // Optional: Toggle filter sections
    window.toggleFilter = function (sectionId) {
        const section = document.getElementById(sectionId);
        section.style.display = section.style.display === "none" ? "block" : "none";
    };
  });
  