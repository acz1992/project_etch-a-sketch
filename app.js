// Remaining Jobs
// 1) Add a button to the top of the screen that will send the user a popup asking for the number of squares per side for the new grid. Once entered, the existing grid should be removed and a new grid should be generated in the same total space as before (e.g. 960px wide) so that you’ve got a new sketch pad
//                Research button tags in HTML and how you can make a JavaScript function run when one is clicked.
//
// 2) Instead of just changing the color of a square from black to white (for example), have each pass through with the mouse change it to a completely random RGB value. Then try having each pass just add another 10% of black to it so that only after 10 passes is the square completely black.

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
			gridCell.addEventListener("mouseover", changeColour);
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

function changeColour(e) {
	const cell = e.target;
	cell.style.backgroundColor = "blue";
}

function clearGrid() {
	while (gridContainer.firstChild) {
		gridContainer.removeChild(gridContainer.firstChild);
	}
}
