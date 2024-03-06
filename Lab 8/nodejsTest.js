function calculateAverage(array){
    const sum = array.reduce((acum, current) => acum + current, 0);
    return sum / array.length;
}

const fs = require('fs');

function writeInFile(fileName, content){
    fs.writeFile(fileName, content, (error) => {
        if (error) throw error;
        console.log('File was saved successfully');
    });
}

function currectDateAsAString(){
    const currentDate = new Date();
    const dateAsAString = currentDate.toLocaleDateString('es-Mx', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return dateAsAString;
}

const promedio = calculateAverage([20,14,12,52,55]);
console.log(`Promedio del Arreglo [20,14,12,52,55]: ${promedio}`);

writeInFile('test.txt', 'Hola Mundo!!!!');

console.log(`${currectDateAsAString()}`);


const http = require('http');

const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.write(`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Validator</title>
        <!--Import Google Icon Font-->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!--Import materialize.css-->
        <link type="text/css" rel="stylesheet" href="../materialize/css/materialize.min.css"  media="screen,projection"/>
      </head>
      <body class="grey lighten-4">
        <header>
            <nav>
                <div class="nav-wrapper grey darken-4">
                    <div class="brand-logo center" onclick="changeTitleTextStyle()" style="cursor:pointer;">Password Validator</div>
                </div>
              </nav>
        </header>
    
            
        <main>
            <div class="container">
                <div class="row">
                    <div class="col s12 m8 offset-m2">
                        <div class="card">
                            <div class="card-content">
                                <div class="center">
                                    <!-- User Profile Picture Icon -->
                                <div class="profile-pic-placeholder">
                                    <i class="medium material-icons">account_circle</i>
                                </div>
                                <!-- Password Input -->
                                <div class="input-field">
                                    <input id="password" type="password" class="validate">
                                    <label for="password">Password</label>
                                </div>
                                <!-- Password Input Validation -->
                                <div class="input-field">
                                    <input id="passwordValidation" type="password" class="validate" disabled>
                                    <label for="passwordValidation">Reintroduce Your Password</label>
                                </div>
                                <!-- Space For The Tips Given To Users -->
                                <div>
                                    <div id="tipsGivenToUser" class="center"></div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    
        <div id="messagePlaceholder"></div>
    
        <div id="linkToDocument"></div>
    
        <script type="text/javascript" src="../materialize/js/materialize.min.js"></script>
        <script src="../Lab 6/script.js"></script>
      </body>
    </html>`);
    response.end();
});

server.listen(3000); // Puerto utilizado por el servidor

