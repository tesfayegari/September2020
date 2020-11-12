"use strict";
// function  doSomething () {
//   alert('You clicke me! ');
// }
// Variables - Temporary information storage 
var varName = 'This is awesome'; //string
//alert(varName);
var age = 21; //number data type
var a; //undefined data
//alert(a);
var b = null;
var firstStudent = 'Tesfaye';
var secondStudent ='Aman';
var thirdStudent = 'Mike';
var fourthStudent = 'Selam';
// collection of data is stored in a data type called Arrays
var students = ['Tesfaye', 'Aman', 'Mike', 'Selam'];
// age = 'Tesfaye Gari';
//alert(age*3);
var num1 = '55'; //String is not a number
var num2 = 40; //number
//alert(num1 + num2); // Raja: 5540 Concatenation (string addition)
// Number modules % Reminder
//20%6 = 2, 20/6= 3.333333
// Eskedar said, "Yes"
var eskSaying = 'Eskedar\'s brother said, "Yes"';
var areYouSure = true; //Boolean value

//num1 = num2; // = is an assignment operator
num1 == num2; // == is an equality operator
var a = 10; 
var b = '10';
// if(condition){
//   //True statemtns 
// }else if(condition2){
//   //condition2 value true statement
// }else {
//   //otherwise statemetn 
// }

if(num1 == num2 ){
  console.log('num1 and num2 are equal');
}else{
  console.log('num1 and num2 are not equal');
}

console.log('Number 1')
console.log('Number 2')
console.log('Number 3')
console.log('Number 4')
//Looping Syntax - For loop
// for(initialization; comparison; action){
 //Loop block
// }

for( var i = 1; i <= 100 ; i = i+1){
   console.log('Number ' + i);
}

//Display all the array values 
var students = ['John','Tesfaye', 'Aman', 'Mike', 'Selam', 'Mesi', 'Eskedar', 'Biny'];

for( var i = 0; i < students.length ; i = i+1){
  console.log(students[i])
}

for(var i in students){
  console.log(students[i])
}

for(var s of students){  //ECMAScript 6
  console.log(s)
}
console.log('Advanced Feature of Loops of Array');
students.forEach(s => console.log(s));
