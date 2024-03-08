const fs = require('fs');

const express = require('express');

const router = express.Router();

const path = require('path');

const userInfo = [];

router.get('/userinfo', (request, response, next) => {
    response.send(`<!DOCTYPE html>
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
              <ul id="nav-mobile" class="right hide-on-med-and-down">
                  <li><a href="userinfo">User Information</a></li>
                  <li><a href="cat">Cats</a></li>
                  <li><a href="dog">Dogs</a></li>
              </ul>
          </div>
      </nav>
    
        <div class="container">
            <h2>Enter Person Details</h2>
            <form action="userinfo" method="POST">
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
        <script src="app.js"></script>
    </body>
    </html>`);
});

router.post('/userinfo', (request, response, next) => {
    userInfo.push({
        name: request.body.name,
        age: request.body.age,
        gender: request.body.gender,
    });

    const dataString = userInfo.map(item => `Nombre: ${item.name}, Edad: ${item.age}, Género: ${item.gender}`).join('\n');

    fs.writeFile('User Store Data.txt', dataString, 'utf8', function(error) {
        if (error) throw error;
        console.log('Info was stored successfully');
    });

    response.redirect('/');
});

router.get('/', (request, response, next) => {
    response.sendFile(path.join(__dirname, '../main.html'));
});

module.exports = router;