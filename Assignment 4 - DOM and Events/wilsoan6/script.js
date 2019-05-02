const activeBorderStyle = "3px solid #000000"
const normalBorderStyle = "1px solid #000000"

let mainTable = createTable(4);
document.body.appendChild(mainTable);

let controlPanel = createButtonDiv("↑", "↓", "←", "→", "Mark Cell");
document.body.appendChild(controlPanel);

let activeCell = document.getElementById("1 1");
activeCell.style.border = activeBorderStyle;

document.getElementById("Mark Cell").addEventListener("click", changeToYellow);
document.getElementById("→").addEventListener("click", moveRight);
document.getElementById("←").addEventListener("click", moveLeft);
document.getElementById("↓").addEventListener("click", moveDown);
document.getElementById("↑").addEventListener("click", moveUp);

//****************
//helper functions
//****************

//*******************
//creates square table of size "size", with a header row and cells indicating their coordinates
//*******************
function createTable(size){
    const table = document.createElement("table");

    //add header row
    const tableHead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    for(let i = 1; i <= size; i++){
        const cell = document.createElement("th"); 
        cell.textContent = `Header ${i}`;
        cell.style.border = normalBorderStyle;
        headerRow.appendChild(cell);
    }
    tableHead.appendChild(headerRow);
    table.appendChild(tableHead);
    
    //add other rows
    let tableBody = document.createElement("tbody");

    for(let i = 1; i <= size - 1; i++){
        const row = document.createElement("tr");
        
        for(let j = 1; j <= size; j++){
            const cell = document.createElement("td");
            cell.textContent = `${i} ${j}`;
            cell.id = `${i} ${j}`;
            cell.style.border = normalBorderStyle;
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    table.style.borderCollapse = "collapse";

    return table;
}

//*******************
//returns a div with buttons labelled whatever is input. Accepts any number of arguments.
//*******************
function createButtonDiv(...textIn){
    const buttonDiv = document.createElement("div");

    for(let text of textIn){
        const button = document.createElement("button");
        button.textContent = text;
        button.id = text;
        buttonDiv.appendChild(button);
    }
    return buttonDiv;
}

//*******************
//gives makes the passed cell "active", "deactivates" previous active cell, and updates borders.
//*******************
function updateActiveCell(cell){
    activeCell.style.border = normalBorderStyle;
    activeCell = cell;
    activeCell.style.border = activeBorderStyle;
}

//*******************
//sets active cell's background permanently to yellow
//*******************
function changeToYellow(){
    activeCell.style.background = "yellow";
}

//*******************
//moves the active cell right, does nothing if at right border
//*******************
function moveRight(){
    if(activeCell.nextElementSibling != null){
        updateActiveCell(activeCell.nextElementSibling);
    }
}

//*******************
//moves the active cell left, does nothing if at left border
//*******************
function moveLeft(){
    if(activeCell.previousElementSibling != null){ 
        updateActiveCell(activeCell.previousElementSibling);
    }
}

//*******************
//moves the active cell down, does nothing if at bottom border
//*******************
function moveDown(){

    if(activeCell.parentElement.nextElementSibling != null){
        //id is "${row} ${col}", so split extracts the column number into colNumber[1]
        const colNumber = activeCell.id.split(" ");

        //temp is the _first_ cell of the next row
        let temp = activeCell.parentElement.nextElementSibling.firstElementChild;
        
        //iterate through until you get to the current column
        for(let i = 1; i < colNumber[1]; i++){
            temp = temp.nextElementSibling;
        }
        updateActiveCell(temp);
    }
}

//*******************
//moves the active cell up, does nothing if at top border (not including header row)
//*******************
function moveUp(){

    if(activeCell.parentElement.previousElementSibling != null){

        //id is "${row} ${col}", so split extracts the column number into colNumber[1]
        const colNumber = activeCell.id.split(" ");

        //temp is the _first_ cell of the prev row
        let temp = activeCell.parentElement.previousElementSibling.firstElementChild;

        //iterate through until you get to the current column
        for(let i = 1; i < colNumber[1]; i++){
            temp = temp.nextElementSibling;
        }
        updateActiveCell(temp);
    }
}