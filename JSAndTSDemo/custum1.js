//Functions Builtin and user defined functions
//Ex of builtin functions are alert, confirm, etc
//Syntax of a function 
// function funcName(param) {
//  return value; //optional
// }

function isPrime(x){
  for(var n = 2; n < x; n++){
    if(x % n == 0){
      // x is not a prime
      return false;
    }
  }
  return true;
}

function generatePrime(){
  var initial = document.getElementById('number1').value*1;
  var end = document.getElementById('number2').value*1;
  var result = [];
  if(initial > end){
    alert('Your initial has to be less');
    return;
  }
  for(var i = initial; i< end; i++){
    if(isPrime(i)){
      result.push(i);
    }
    document.getElementById('progresss').style.width = Math.ceil(i/end*100) + '%';
    document.getElementById('progresss').innerText = Math.ceil(i/end*100) + '%';
  }

  //display the result 
  document.getElementById('result').innerHTML = result;
}

function clearResult() {
  document.getElementById('result').innerHTML = '';
}