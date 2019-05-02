function deepEqual(thing1, thing2) {
    if(thing1 === thing2) {
        return true;
    }
    
    //if they are both objects, compare properties  
    if((typeof(thing1) == "object" && thing1 != null) && 
       (typeof(thing2) == "object" && thing2 != null)) {
        
        //if they have different numbers of properties return false
        if(Object.keys(thing1).length !== Object.keys(thing2).length){
            //console.log("Different number of properties");
            return false;
        }
        
        for(let key in thing1){
            
            //if thing2 doesn't contain the same keys, they are not equal
            if(!Object.keys(thing2).includes(key)) {
                //console.log("Different keys");
                return false;
            }

            //console.log(key + " : " + thing1[key]);
            //console.log(key + " : " + thing2[key]);
            
            //if the values of the corresponding keys are not equal, then they are not equal
            if(!deepEqual(thing1[key], thing2[key])){
                //console.log("Different key values");
                return false;
            }
        }
        return true;
    }
}

let obj = {here: {is: "an"}, object: 2, number: 45};
//console.log(deepEqual(2, 22));

console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2, number: 45}));
// → true