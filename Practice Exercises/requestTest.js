let xhr = new XMLHttpRequest();
xhr.open("GET", "api.openweathermap.org/data/2.5/weather?zip=94040,us", true);
xhr.send(null);
console.log(JSON.parse(xhr.responseText));