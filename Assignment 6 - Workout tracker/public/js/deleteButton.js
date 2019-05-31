document.getElementById("exercise-table").addEventListener("click", removeItem);

function removeItem(event){
    if(event.target.classList.contains("delete-button")){
        
        //grabs ID from table
        let deleteID = event.target.parentElement.parentElement.firstElementChild.textContent;

        //create object
        let deleteItem = {};
        deleteItem.id = deleteID
        deleteItem.action = "delete"

        //create POST request
        const req = new XMLHttpRequest();
        req.open('POST', '/', true);
        req.setRequestHeader('Content-Type', 'application/json');

        req.addEventListener('load',function deleteRow(){
            if(req.status >= 200 && req.status < 400){
                let row = event.target.parentElement.parentElement;
                row.parentNode.removeChild(row);
            }
            else{
                console.log("Error in network request: " + req.statusText);
            }
        })
        req.send(JSON.stringify(deleteItem));       
    };
}