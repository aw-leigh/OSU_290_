document.getElementById("zipinputbutton").addEventListener("click", function(e){
    let zipCode = document.getElementById("zipinput").value;
    let type = "zip";
    makeWeatherCall(zipCode, type);
    e.preventDefault();
});

document.getElementById("cityinputbutton").addEventListener("click", function(e){
    let cityName = document.getElementById("cityinput").value;
    let type = "q"
    makeWeatherCall(cityName, type);
    e.preventDefault();
});

function makeWeatherCall(value, type){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://api.openweathermap.org/data/2.5/weather?${type}=${value}&appid=92b5db477e67c8a758eb2a5f21235059&units=metric`, true);
    
    xhr.addEventListener('load', function(){
        if(xhr.status >= 200 && xhr.status < 400){
            let response = JSON.parse(xhr.responseText);
            document.getElementById("outputCity").textContent = `City: ${response.name}`;
            document.getElementById("outputTemp").textContent = `Temperature: ${response.main.temp}C`;
            document.getElementById("outputHumidity").textContent = `Humidity: ${response.main.humidity}`;
        } else {
            console.log("Error in network request: " + xhr.statusText);
        }});
    
    xhr.send(null);  
  }  

document.getElementById("httpbinbutton").addEventListener("click", function(e){
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://httpbin.org/post", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', function(){
        if(xhr.status >= 200 && xhr.status < 400){
            let response = JSON.parse(xhr.responseText);
            document.getElementById("httpbinOutput").textContent = response.data;
        } else {
            console.log("Error in network request: " + xhr.statusText);
        }});
    
    xhr.send(JSON.stringify(document.getElementById("httpbininput").value));    
    
    });