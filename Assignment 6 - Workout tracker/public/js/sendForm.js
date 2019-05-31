let form = document.getElementById("exercise-form");

//wait for submission
form.addEventListener("submit", function (event) {
    
    //stop page refresh
    event.preventDefault();

    //create object
    let formData = createObjectFromFormContents();

    //clear form fields
    form.reset();

    //create POST request
    const req = new XMLHttpRequest();
    req.open('POST', '/', true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        //on success, add row to table  

        const idReply = JSON.parse(req.response);
        const ID = idReply["insertedID"]; 

        //remove "action" because it's only used by the server
        //to determine what to do with the request
        delete formData.action;

        appendNewRow(formData, ID);
        
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(JSON.stringify(formData));
});


function createObjectFromFormContents(){
  let formData = {};
  formData.name = form.elements.name.value;
  formData.reps = form.elements.reps.value;
  formData.weight = form.elements.weight.value;
  formData.date = form.elements.date.value;
  formData.unit = form.elements.unit.value;
  formData.action = form.elements.action.value;
  return formData;
}

function appendNewRow(formData, id){
  
  //add ID to hidden table column
  const row = document.createElement("tr");
  let cell = document.createElement("td");
  cell.textContent = id;
  row.appendChild(cell);

  //add other columns
  for(property in formData){
      let cell = document.createElement("td");
      cell.textContent = formData[property];
      row.appendChild(cell);
  }

  //add buttons
  let deleteCell = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.className = "delete-button btn btn-sm btn-danger"
  deleteButton.innerText = "Delete"
  deleteCell.appendChild(deleteButton);
  row.appendChild(deleteCell);

  let editCell = document.createElement("td");
  let editButton = document.createElement("button");
  editButton.className = "edit-button btn btn-sm btn-info"
  editButton.innerText = "Edit"
  editCell.appendChild(editButton);
  row.appendChild(editCell);

  document.getElementById("exercise-table-body").appendChild(row);
}