/* 
Contexte :
Une agence de comptabilité souhaite créer sa propre Console Comptable pour permettre à ses
comptables d'effectuer toutes sortes d'opérations mathématiques nécessaires à leur travail
quotidien : addition, soustraction, multiplication, division, etc. Cependant, l'agence préfère éviter le
terme 'calculatrice' pour son outil.

Objectif :
Tu dois créer une application en JavaScript pour la Console Comptable qui permet d'effectuer les 
opérations suivantes :

Opérations de base :
- Addition
- Soustraction
- Multiplication
- Division

Opérations avancées :
- Moyenne d'un ensemble de nombres
- Calcul du pourcentage
*/
const input = document.getElementById('comptable-number');
const calculScreen = document.getElementById('comptable-calcul-screen');

let previousNumber = 0;
let isWaiting = false;
let operatorType = '';
let onResult = false;
let firstNumberEntered = false;

function clearAll() {
    input.value = 0;
    calculScreen.innerHTML = '&emsp;';
}

function addNumber(number){
    if(number === '.' && input.value.includes('.')) return;

    if((isWaiting && firstNumberEntered) || onResult || (input.value.startsWith('0') && number !== '.' && !input.value.includes('.'))) {
        input.value = number;
        onResult = false;
        firstNumberEntered = false;
    } else input.value += number;
}

function operation(operator, e){
    operatorType = operator;
    previousNumber = Number(input.value);
    calculScreen.innerText = `${previousNumber}${e.innerText}`;
    isWaiting = true;
    firstNumberEntered = true;
}

function opInverse(){
    input.value = input.value.length !== 0 ? -input.value : 0;
}

function deleteLastNumber(){
    input.value = input.value.length === 1 ? 0 : input.value.substring(0, input.value.length - 1);
}

function operationInstant(operator){
    const currentNumber = Number(input.value);
    switch(operator) {
        case '%':
            input.value = currentNumber / 100;
            break;
        default:
            alert('An error occur!');
            break;
    }
}

function solve(){
    if(!isWaiting) return;
    onResult = true;

    const lastNumber = Number(input.value);
    let answer = 0;

    calculScreen.innerHTML += `${lastNumber}&equals;`;

    switch(operatorType){
        case '%':
            break;
        case '/':
            answer = previousNumber / lastNumber;
            break;
        case 'x':
            answer = previousNumber * lastNumber;
            break;
        case '-':
            answer = previousNumber - lastNumber;
            break;
        case '+':
            answer = previousNumber + lastNumber;
            break;
        default:
            alert('An error occur!');
            break;
    }

    input.value = answer;
    isWaiting = false;
}