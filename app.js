// Finally, create different buttons that toggle the three different modes (Normal, Random and Opaque)

/* The Set Up */
// Grab HTML elements
const gridContainer = document.querySelector(".gridContainer");
const gridButtonContainer = document.querySelector(".gridButtonContainer");
const newGridButton = document.querySelector("#newGridButton");

const normalModeButton = document.querySelector("#normalModeButton");
const rainbowModeButton = document.querySelector("#rainbowModeButton");
const shadeModeButton = document.querySelector("#shadeModeButton");

// Set DEFAULT mode
let currentMode = "normal";

/* Add Event Listeners */
// 1) Add Event Listener to "Create New Grid" button
newGridButton.addEventListener("click", handleNewGridButtonClick);
// 2) Add Event Listeners to Buttons
normalModeButton.addEventListener("click", () => setMode("normal"));
rainbowModeButton.addEventListener("click", () => setMode("rainbow"));
shadeModeButton.addEventListener("click", () => setMode("shade"));

// Call setMode function, using DEFAULT mode
setMode(currentMode);

// Function that sets mode based on string
function setMode(mode) {
	// 1) remove all existing eventListeners
	gridContainer.removeEventListener("mouseover", normalMode);
	gridContainer.removeEventListener("mouseover", rainbowMode);
	gridContainer.removeEventListener("mouseover", shadeMode);
	// 2) sets new eventListener based on clicked mode
	switch (mode) {
		case "normal":
			gridContainer.addEventListener("mouseover", normalMode);
			break;
		case "rainbow":
			gridContainer.addEventListener("mouseover", rainbowMode);
			break;
		case "shade":
			gridContainer.addEventListener("mouseover", shadeMode);
			break;
		// NOTE - didnt set default like Chat GPT suggested as I think its covered above
	}
	currentMode = mode;
}

// Function from above button
function handleNewGridButtonClick() {
	// 1) Clears existing grid
	removeGrid();
	const gridSize = prompt("Enter a grid size smaller than 100 cells");
	// 2) Gets user input for Grid Size, validates input.
	const validatedSize = verifyGridSize(gridSize);
	// 3) If gridSize returned from function....
	if (validatedSize) {
		// 4) than retrieve gridCells array from gridCreation function
		const gridCells = gridCreation(validatedSize);
		// 5) Use the gridCells outside of the function
		gridCells.forEach((gridCell) => {
			// 6) To attach Event Listeners
			gridCell.addEventListener("mouseover", normalMode);
		});
	} else {
		handleNewGridButtonClick();
	}
}

//Verifies whether user input is valid
function verifyGridSize(gridSize) {
	// 1) If user input of gridSize returns NaN/ mroe than 100/ less than 0
	if (isNaN(gridSize) || gridSize > 100 || gridSize < 1) {
		// 2) Null returned/ instead of gridSize - causing recursion in handleNewGridButtonClick() function
		return null;
	} else {
		return gridSize;
	}
}

// Generates grid
function gridCreation(gridSize) {
	// 1) Set Grid layout on container using Flex
	gridContainer.style.display = "flex";
	gridContainer.style.flexWrap = "wrap";
	// 2) Create empty Array of cells
	const gridCells = [];
	// 3) Calculate size of each cell based on given container dimensions and generate grid size using user input
	const cellSize = Math.floor(
		Math.min(gridContainer.offsetWidth, gridContainer.offsetHeight) /
			gridSize
	);

	// 4) Generate a grid using nested for loops
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
	// 5) Return array so it can be used outside of the function
	return gridCells;
}

/* The different colour modes */

function normalMode(e) {
	const cell = e.target;
	cell.style.backgroundColor = "black";
	const filledCell = Array.from(gridContainer.children).find(
		(child) => child.style.backgroundColor !== ""
	);
	if (filledCell) {
		showClearGridButton();
	}
}

function shadeMode(e) {
	const cell = e.target;
	cell.style.opacity = "0.1";
	cell.addEventListener("click", () => {
		const currentOpacity = parseFloat(cell.style.opacity);
		const newOpacity = currentOpacity + 0.1;
		cell.style.opacity = newOpacity.toString();
	});
	const filledCell = Array.from(gridContainer.children).find(
		(child) => child.style.backgroundColor !== ""
	);
	if (filledCell) {
		showClearGridButton();
	}
}

function rainbowMode(e) {
	const cell = e.target;
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	cell.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
	const filledCell = Array.from(gridContainer.children).find(
		(child) => child.style.backgroundColor !== ""
	);
	if (filledCell) {
		showClearGridButton();
	}
}

// Clears grid
function removeGrid() {
	while (gridContainer.firstChild) {
		gridContainer.removeChild(gridContainer.firstChild);
	}
}

function clearGrid() {
	const gridCells = Array.from(gridContainer.children);
	gridCells.forEach((cell) => {
		if (cell.style.backgroundColor !== "") {
			cell.style.backgroundColor = "";
			cell.style.opacity = "";
		}
	});
	hideClearGridButton();
}

function showClearGridButton() {
	let clearGridButton = document.querySelector("#clearGridButton");
	if (!clearGridButton) {
		clearGridButton = document.createElement("button");
		clearGridButton.setAttribute("id", "clearGridButton");
		clearGridButton.textContent = "Clear Grid";
		clearGridButton.addEventListener("click", clearGrid);
		gridButtonContainer.appendChild(clearGridButton);
	}
}

function hideClearGridButton() {
	const clearGridButton = document.querySelector("#clearGridButton");
	if (clearGridButton) {
		clearGridButton.remove();
	}
}
