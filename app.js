// 1) Instead of just changing the color of a square from black to white (for example), have each pass through with the mouse change it to a completely random RGB value. Then try having each pass just add another 10% of black to it so that only after 10 passes is the square completely black.

const gridContainer = document.querySelector(".gridContainer");
const newGridButton = document.querySelector("#newGridButton");

newGridButton.addEventListener("click", handleNewGridButtonClick);

function handleNewGridButtonClick() {
	clearGrid();
	const gridSize = prompt("Enter a grid size smaller than 100 cells");

	const validatedSize = verifyGridSize(gridSize);
	if (validatedSize) {
		// Retrieve the gridCells array from gridCreation function
		const gridCells = gridCreation(validatedSize);
		// Use the gridCells outside of the function
		gridCells.forEach((gridCell) => {
			gridCell.addEventListener("mouseover", hoverEffect);
		});
	} else {
		handleNewGridButtonClick();
	}
}

//Verifies whether user input is valid
function verifyGridSize(gridSize) {
	if (isNaN(gridSize) || gridSize > 100 || gridSize < 1) {
		return null;
	} else {
		return gridSize;
	}
}

// Generates grid
function gridCreation(gridSize) {
	// Set grid layout on container using Flex
	gridContainer.style.display = "flex";
	gridContainer.style.flexWrap = "wrap";
	// Create empty Array of cells
	const gridCells = [];
	// Calculate size of each cell based on given container dimensions and
	// generate grid size using user input
	const cellSize = Math.floor(
		Math.min(gridContainer.offsetWidth, gridContainer.offsetHeight) /
			gridSize
	);

	// Generate a grid using nested for loops
	for (let row = 0; row < gridSize; row++) {
		for (let col = 0; col < gridSize; col++) {
			const gridCell = document.createElement("div");
			gridCell.style.width = cellSize + "px";
			gridCell.style.height = cellSize + "px";
			gridCell.style.border = "1px solid black";
			gridContainer.appendChild(gridCell);
			gridCells.push(gridCell);
		}
	}
	// Return array so it can be used outside of the function
	return gridCells;
}

function hoverEffect(e) {
	const cell = e.target;
	cell.style.backgroundColor = generateRandomColour();
}

// Clears grid
function clearGrid() {
	while (gridContainer.firstChild) {
		gridContainer.removeChild(gridContainer.firstChild);
	}
}

// function that generates random colour
function generateRandomColour() {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return "rgb(" + r + "," + g + "," + b + ")";
}
