function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

Automobile.prototype.logMe = function(showType){
    if(showType){
        console.log(`${this.year} ${this.make} ${this.model} ${this.type}`)
    }
    else{
        console.log(`${this.year} ${this.make} ${this.model}`)
    }
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. 
You pass it a comparator and an array of objects appropriate for that comparator and it will return 
a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr(comparator, array){
    let sortedAutomobiles = [];

    if(comparator.toLowerCase() == "year"){
        sortedAutomobiles = array.sort(yearComparator)
    }
    else if(comparator.toLowerCase() == "make"){
        sortedAutomobiles = array.sort(makeComparator)
    }
    else if(comparator.toLowerCase() == "type"){
        sortedAutomobiles = array.sort(typeComparator)
    }
    return sortedAutomobiles;
}

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator(auto1, auto2){
    return (auto1.year < auto2.year ? 1 : -1);
}

/*This compares two automobiles based on their make. 
It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later (from A-Z).*/
function makeComparator(auto1, auto2){
    return (auto1.make.toLowerCase() > auto2.make.toLowerCase() ? 1 : -1);
}

/*This compares two automobiles based on their type. 
The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed).
It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator(auto1, auto2){
    if(returnTypeValue(auto1) > returnTypeValue(auto2)){
        return 1;
    }
    else if(returnTypeValue(auto1) < returnTypeValue(auto2)){
        return -1;
    }
    else{ //if they are the same type, sort newest first
        return yearComparator(auto1, auto2);
    }
}

function returnTypeValue(auto){
    if(auto.type.toLowerCase() == "roadster"){
        return 0;
    }
    else if(auto.type.toLowerCase() == "pickup"){
        return 1;
    }
    else if(auto.type.toLowerCase() == "suv"){
        return 2;
    }
    else if(auto.type.toLowerCase() == "wagon"){
        return 3;
    }
    else{
        return 4;
    }
}

function printOrderedLists(comparator, array){
    console.log(`The cars sorted by ${comparator} are:`);

    displayArray = sortArr(comparator, automobiles)
    displayArray.forEach(car => {
        if(comparator.toLowerCase() == "type"){
            car.logMe(true);
        }
        else{
            car.logMe(false);
        }
    });
}


console.log("*****");
printOrderedLists("year", automobiles)
console.log("");
printOrderedLists("make", automobiles)
console.log("");
printOrderedLists("type", automobiles)
console.log("*****");