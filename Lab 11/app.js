const express = require('express');

const app = express();

// "body-parser" is a third party midleware that allows you to analyze
// requests' bodies
const bodyParser = require('body-parser');

// It allows you to analyze requests' bodies with content type
// "application/x-www-form-urlencoded", meaning, it can give sense to
// the forms' data
app.use(bodyParser.urlencoded({extended: false}));

const mainRoutes = require('./routes/main.routes.js');
const catRoutes = require('./routes/cats.routes.js');
const dogRoutes = require('./routes/dogs.routes.js');

// This is "mounting the route", and it means that all routes defined inside
// "myRoutes" are going to be attach to the specified route
app.use('/cat', catRoutes);
app.use('/dog', dogRoutes);
app.use('/', mainRoutes);

app.use((request, response, next) => {
    response.status(404);
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
            <h1>404</h1>
            <h2>The file you're searching for doesn't exist</h2>
        </div>
    
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <script src="app.js"></script>
    </body>
    </html>`)
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});