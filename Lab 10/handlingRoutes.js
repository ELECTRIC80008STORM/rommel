const http = require('http');
const fs = require('fs');
const path = require('path');

const userInfo = [];

const server = http.createServer((request, response) => {
    // It lets you store response.url inside url, and response.method inside method. It's an example of destructuring
    // Object destructuring allows you to extract properties of an object and assign them to variables.
    const { url, method } = request;
  
    if (url === '/' && method === 'GET') {
        // __direname is a Node.js Global Variable with the absolute route of the directory the file is at
        const filePath = path.join(__dirname, 'routeTesting.html');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('File reading error', err);
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Internal server error');
                return;
            }

            //  writeHead is used to send one-line states
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(data);
        });

    } else if (url === '/route1' && method === 'GET') {
      response.setHeader('Content-Type', 'text/html');
      response.write(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <!--Import Google Icon Font-->
              <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
              <!--Import materialize.css-->
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
          <title>Testing How To Handle Routes</title>
      </head>
      <body>
          <nav>
              <div class="nav-wrapper">
                  <ul id="nav-mobile" class="right hide-on-med-and-down"></ul>
              </div>
          </nav>
      
          <div class="container">
              <h2>Enter Person Details</h2>
              <form action="route1" method="POST">
                  <div class="input-field">
                      <input type="text" id="name" name="name" required>
                      <label for="name">Name</label>
                  </div>
                  <div class="input-field">
                      <input type="number" id="age" name="age" required>
                      <label for="age">Age</label>
                  </div>
                  <div class="input-field">
                      <p>
                          <label>
                              <input name="gender" type="radio" value="male" required>
                              <span>Male</span>
                          </label>
                      </p>
                      <p>
                          <label>
                              <input name="gender" type="radio" value="female" required>
                              <span>Female</span>
                          </label>
                      </p>
                  </div>
                  <button class="btn waves-effect waves-light" type="submit">Submit</button>
              </form>
          </div>
      
          <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
          <script src="handlingRoutes.js"></script>
      </body>
      </html>`)
      response.end();
    } else if (url === '/route2' && method === 'GET'){
        response.setHeader('Content-Type', 'text/html');
        response.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <!--Import Google Icon Font-->
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <!--Import materialize.css-->
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            <title>Testing How To Handle Routes</title>
        </head>
        <body>
            <nav>
                <div class="nav-wrapper">
                    <ul id="nav-mobile" class="right hide-on-med-and-down"></ul>
                </div>
            </nav>
        
            <div class="container">
                <h1>Testing How To Handle Routes</h1>
                <h3>Right Now You're In The Root No. 2</h3>
                <p>There is not much to do here.</p>
                <p>Perhaps you could try route1?</p>
            </div>
        
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <script src="handlingRoutes.js"></script>
        </body>
        </html>`)
        response.end();
    } else if (url === '/route1' && method === 'POST') {
        const dataStore = [];

        request.on('data', (dataFromForms) => {
            console.log(dataFromForms);
            dataStore.push(dataFromForms);
        });
  
        return request.on('end', () => {
            const completeData = Buffer.concat(dataStore).toString();
            const name = completeData.split('&')[0].split('=')[1];
            console.log(name);
            const age = completeData.split('&')[1].split('=')[1];
            console.log(age);
            const gender = completeData.split('&')[2].split('=')[1];
            console.log(gender);
            userInfo.push({
              name: name, 
              age: age, 
              gender: gender, 
            });

            const dataString = userInfo.map(item => `Nombre: ${item.name}, Edad: ${item.age}, Género: ${item.gender}`).join('\n');

            fs.writeFile('User Store Data.txt', dataString, 'utf8', function(error) {
                if (error) throw error;
                console.log('Info was stored successfully');
            });

            response.statusCode = 200;
            return response.end('You can remake the process going to the root route');
        });
    } else {
      response.statusCode = 404;
      response.setHeader('Content-Type', 'text/html');
      response.end('<h1>404 Not Found</h1>');
    }
  });

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});