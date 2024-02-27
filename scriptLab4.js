
function generateTable() {
    const num = prompt("Introduce un número (se usará para devolver su valor al cuadrado y al cubo):");
    if(num == 0){
        document.write("<p>There are 0 elements in the list</p>")
    } else {
        if (num < 0){
            num *= -1;
            document.write("<p>Se tomo el valor absoluto del número insertado</p>");
        }
        document.write("<table border='1'><tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>");
        for (let i = 1; i <= num; i++) {
            document.write("<tr><td>" + i + "</td><td>" + i*i + "</td><td>" + i*i*i + "</td></tr>");
        }
        document.write("</table>");
    }
}

function sumNumbers(){
    const num1 = Math.floor(Math.random() * (100));
    const num2 = Math.floor(Math.random() * (100));
    
    const start = Date.now();
    const result = prompt(`Introduce la suma de los dos números mostrados:
    ${num1} + ${num2} = ?`);
    const end = Date.now();
    const timeTaken = end - start;

    let solution;
    if(result == num1 + num2){
        solution = "<b>Correcta</b>";
    } else {
        solution = "<b>Incorrecta</b>";
    }

    document.write(`Suma Dada: ${num1} + ${num2} <br>
    Respuesta Dada: ${result} <br>
    La respuesta dada fue ${solution} <br>
    Tiempo tomado en contestar: ${timeTaken} milisegundos.
    `);
}

function counter(array){
    let negativeNums = 0;
    let zeros = 0;
    let positiveNums = 0;
    array.forEach(element => {
        if(element < 0){
            negativeNums++;
        } else if(element == 0){
            zeros++;
        } else {
            positiveNums++;
        }
    });
    return [negativeNums, zeros, positiveNums];
}

function average(matrix){
    const rowAverages = [];
    for(let row of matrix){
        let sum = 0;
        for(let item of row){
            sum += item;
        }
        let average = sum / row.length;
        rowAverages.push(average);
    }
    return rowAverages;
}

function matrixToTable(matrix) { //Inspired from the internet, link on the references
    let table = "<table>";
    for (let i = 0; i < matrix.length; i++) {
        table += "<tr>";
        for (let j = 0; j < matrix[i].length; j++) {
            table += "<td>" + matrix[i][j] + "</td>";
        }
        table += "</tr>";
    }
    table += "</table>";
    return table;
}

function inverse(number){
    let numAsString = number.toString();
    let inverseNum = parseInt(numAsString.split('').reverse().join(''));
    return inverseNum;
}

function sumElementsArray(array){
    let count = 0;
    for(let element of array){
        count += element;
    }
    return count;
}