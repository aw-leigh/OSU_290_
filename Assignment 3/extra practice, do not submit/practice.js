/*To check your understanding of this section, you should write two small functions. 
The first is a function which will sum an array of integers. 
Arrays have a built in forEach method which works on every element in the array. 
For example [1,2,3].forEach(foo) would call the function foo three times, 
passing the arguments 1, 2 and 3 respectively. 
This function can do more advanced things as well if you want to read about it at MDN's forEach reference. 
You can use this or you can write your own forEach function. 
Either way, use a higher-order function to achieve this and do not simply directly loop through the array to sum it.



function sumArray(array){
    let result = 0;
    array.forEach(function(element) {
        result += element;
    });
    return result;
}


console.log(sumArray([1,2,3,4]))
*/

/*
Next you should write a function which creates dialog functions. 
It should take a character name as an argument. 
It should return a function which takes a line of dialog and returns a 
string which quotes it and adds the reference to the speaker. For example:

var Donald = { name: "Donald Duck"};
Donald.speak = dialog("Donald Duck");
console.log(Donald.speak("Hello there"));
So the output of this code to the console should be Donald Duck says "Hello There".



function dialog(speaker){
    return function(speech) {
        return `${speaker} says ${speech}`
    };
}

var Donald = { name: "Donald Duck"};
Donald.speak = dialog("Donald Duck");
console.log(Donald.speak("Hello there"));


const retailCompanies = companies.filter(company => company.category === "Retail");
const eightiesCompanies = companies.filter(company => (company.start >= 1980 && company.start < 1990));
const tenYearCompanies = companies.filter(company => (company.end - company.start >= 10));
*/


//  CLOSURE

/*
function createCounter(){
    let counter = 0
    const myFunction = function() {
        counter = counter + 1
        return counter
    }  
    return myFunction
}
const increment = createCounter()
const c1 = increment()
const c2 = increment()
const c3 = increment()
const c4 = increment()
console.log('example increment', c1, c2, c3)
*/

function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + list[i];
        result.push( function(x) {
            alert(item + ' ' + list[x])
            }(i));
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}