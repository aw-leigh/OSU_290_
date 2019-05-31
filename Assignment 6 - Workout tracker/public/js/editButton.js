document.getElementById("exercise-table").addEventListener("click", editItem);

function editItem(event){
    //when you click the edit button,
    if(event.target.classList.contains("edit-button")){
        
        //grabs ID and initial state from table
        let currentRow = event.target.parentElement.parentElement;
        const initialState = currentRow.innerHTML;
        const rowID = currentRow.firstElementChild.textContent;

        //start with Name
        let currentCell = currentRow.firstElementChild.nextElementSibling;

        //turn row into inputs
        transformRowToForm(currentCell);

        //disable edit buttons so user can only edit one at a time
        disableAllEditButtons();

        //enable cancel button
        currentRow.addEventListener("click", function(event){
            if(event.target.classList.contains("cancel-edit-button")){
                currentRow.innerHTML = initialState;
                enableAllEditButtons()
            }
        });

        //enable save button  = send UPDATE request
        currentRow.addEventListener("click", function(event){
            if(event.target.classList.contains("save-edit-button")){

            //create object
            let updateData = createObjectFromUpdateFormContents();
            updateData.id = rowID;

            //create POST request
            const req = new XMLHttpRequest();
            req.open('POST', '/', true);
            req.setRequestHeader('Content-Type', 'application/json');

            req.addEventListener('load',function(){
            if(req.status >= 200 && req.status < 400){
                //on success, update row on front end

                //save results from server into array
                const serverResponse = JSON.parse(req.response);
                const updateArray = serverResponse.results;
                
                //revert row back to regular tds
                currentRow.innerHTML = initialState;
                currentCell = currentRow.firstElementChild.nextElementSibling;

                //update text content, reenable edit buttons, and bob's your uncle
                updateRowFromServerResponse(currentCell, updateArray);
                enableAllEditButtons()
                
            } else {
                console.log("Error in network request: " + req.statusText);
            }});

            req.send(JSON.stringify(updateData));

            }
        });        
    };
}
function createObjectFromUpdateFormContents(){
    let data = {};
    data.name = document.getElementById("exercise-edit").value;
    data.reps = document.getElementById("reps-edit").value;
    data.weight = document.getElementById("weight-edit").value;
    data.date = document.getElementById("date-edit").value;
    //data.unit = document.getElementById("unit-edit").value;

    //it's not in a form this time so I think I have to iterate through
    let radioButtons = document.getElementsByName("unit-edit");
    for(let i = 0; i < radioButtons.length; i++){
        if(radioButtons[i].checked){
            data.unit = radioButtons[i].value;
        }
    }

    data.action = "update";
    return data;
}

//very ugly and fragile but it gets the job done for now
function transformRowToForm(currentCell){

    currentCell.innerHTML =
    `<input type="text" name="name" class="form-control form-control-sm"`+
    `id="exercise-edit" required value="${currentCell.textContent}"/>`
    
    currentCell = currentCell.nextElementSibling 

    currentCell.innerHTML = 
    `<input type="number" name="reps" class="form-control form-control-sm"`+
    `id="reps-edit" " required value="${currentCell.textContent}">`

    currentCell = currentCell.nextElementSibling 

    currentCell.innerHTML = 
    `<input type="number" name="weight" class="form-control form-control-sm"`+
    `id="weight-edit"  required value="${currentCell.textContent}">`

    currentCell = currentCell.nextElementSibling 

    currentCell.innerHTML = 
    `<input type="date" name="date" class="form-control form-control-sm"`+
    `id="date-edit"  required value="${currentCell.textContent}">`        

    currentCell = currentCell.nextElementSibling 

    if(currentCell.textContent == "lbs"){
        currentCell.innerHTML = 
        `<label class="radio"><input type="radio" name="unit-edit" value="lbs" checked>lbs  </label>`+
        `<label class="radio"><input type="radio" name="unit-edit" value="kg">kg</label>` 
    } else {
        currentCell.innerHTML = 
        `<label class="radio"><input type="radio" name="unit-edit" value="lbs">lbs</label>`+
        `<label class="radio"><input type="radio" name="unit-edit" value="kg" checked>kg</label>` 
    }   
    
    currentCell = currentCell.nextElementSibling 

    currentCell.innerHTML = 
    `<button class="save-edit-button btn btn-sm btn-success">Save</button>`

    currentCell = currentCell.nextElementSibling         

    currentCell.innerHTML = 
    `<button class="cancel-edit-button btn btn-sm btn-warning">Cancel</button>` 
}

function updateRowFromServerResponse(currentCell, updateArray){
    //skip last iteration because it is the ID
    for(let i = 0; i < updateArray.length - 1; i++){
        console.log(updateArray[i])
        currentCell.textContent = updateArray[i];
        currentCell = currentCell.nextElementSibling;
    }
}

function disableAllEditButtons(){
    const otherEditButtons = document.getElementsByClassName("edit-button");
    for (i = 0; i < otherEditButtons.length; ++i){
        otherEditButtons[i].disabled = true;
    }
}

function enableAllEditButtons(){
    const otherEditButtons = document.getElementsByClassName("edit-button");
    for (i = 0; i < otherEditButtons.length; ++i){
        otherEditButtons[i].disabled = false;
    }
}
