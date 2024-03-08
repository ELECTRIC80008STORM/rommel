const express = require('express');

const router = express.Router();

const path = require('path');

router.get('/catpage', (request, response, next) => {
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
            <h1>Testing How To Handle Routes</h1>
            <h3>Right Now You're In The Cat Route No. 2</h3>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <script src="app.js"></script>
    </body>
    </html>
    `);
});

router.get('/', (request, response, next) => {
    response.sendFile(path.join(__dirname, '../cat.html'));
});

module.exports = router;