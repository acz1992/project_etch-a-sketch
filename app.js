const gridContainer = document.querySelector(".gridContainer");
const gridSize = prompt("Enter a grid size smaller than 100 cells");

// Calculate size of each cell based on given container dimensions
const gridContainerWidth = gridContainer.offsetWidth;
const gridContainerHeight = gridContainer.offsetHeight;
//Generate grid size using user input
const cellSize = Math.floor(
	Math.min(gridContainerWidth, gridContainerHeight) / gridSize
);

const validatedSize = verifyGridSize(gridSize);
if (validatedSize) {
	gridCreation(validatedSize);
} else {
	alert("Invalid. Please enter a number that is smaller than 100 cells");
}

//Verifies whether user input is valid
function verifyGridSize(gridSize) {
	if (isNaN(gridSize) || gridSize > 100 || gridSize < 1) {
		return null;
	} else {
		return gridSize;
	}
}

function gridCreation(gridSize) {
	// Set grid layout on container using Flex
	gridContainer.style.display = "flex";
	gridContainer.style.flexWrap = "wrap";
	// Generate a grid using nested for loops
	for (let row = 0; row < gridSize; row++) {
		for (let col = 0; col < gridSize; col++) {
			const gridCell = document.createElement("div");
			gridCell.style.width = cellSize + "px";
			gridCell.style.height = cellSize + "px";
			gridCell.style.border = "1px solid black";
			gridContainer.appendChild(gridCell);
		}
	}
}
