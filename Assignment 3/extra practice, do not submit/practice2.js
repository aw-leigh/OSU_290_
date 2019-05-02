/*To check your understanding of this section, you should write two small functions. 
The first is a function which will sum an array of integers. 
Arrays have a built in forEach method which works on every element in the array. 
For example [1,2,3].forEach(foo) would call the function foo three times, 
passing the arguments 1, 2 and 3 respectively. 
This function can do more advanced things as well if you want to read about it at MDN's forEach reference. 
You can use this or you can write your own forEach function. 
Either way, use a higher-order function to achieve this and do not simply directly loop through the array to sum it.*/

var adder = function(array) {
    let result = 0;
    array.forEach(element => result += element);
    return result;
}

var arrayAdd = adder;

console.log(arrayAdd([1, 2, 3]));


/*
Next you should write a function which creates dialog functions. 
It should take a character name as an argument. 
It should return a function which takes a line of dialog and returns a 
string which quotes it and adds the reference to the speaker. For example:

var Donald = { name: "Donald Duck"};
Donald.speak = dialog("Donald Duck");
console.log(Donald.speak("Hello there"));
So the output of this code to the console should be Donald Duck says "Hello There".*/

var dialog = function(name){
    var speak = function (speech){
        return `${name} says "${speech}"`;
    }
    return speak;
}

var Donald = { name: "Donald Duck"};
Donald.speak = dialog("Donald Duck");
console.log(Donald.speak("Hello there"));