//Write a JavaScript program that declares a function but calls it before it is declared. Because of function hoisting this will work in JavaScript. Go prove it!

foo();

function foo() {
    console.log("Hello World");
}

//Also write a function which is assigned to a variable. Call it before it is assigned and prove that this does not work.

//this breaks the code when uncommented
//bar("This is weird"); 

var bar = function( parameter )
{
    console.log(parameter);
}

bar("Hello again world");