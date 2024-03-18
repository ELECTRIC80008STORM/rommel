const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');
app.use(session({
  secret: 'Random long string example of how a low security page works', 
  resave: false, // Session is only saved when something changes
  saveUninitialized: false, // It prevents the app for storing a session that isn't needed
}));

app.use(express.static('public'));

// "body-parser" is a third party midleware that allows you to analyze
// requests' bodies, as of now, it comes with Express, so it doesn't need to be install again
// const bodyParser = require('body-parser');

// It allows you to analyze requests' bodies with content type
// "application/x-www-form-urlencoded", meaning, it can give sense to
// the forms' data
app.use(express.urlencoded({extended: false}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const userRoutes = require('./routes/users.routes.js');
const catRoutes = require('./routes/cats.routes.js');
const dogRoutes = require('./routes/dogs.routes.js');
const mainRoutes = require('./routes/main.routes.js');

// This is "mounting the route", and it means that all routes defined inside
// "mainRoutes" are going to be attach to the specified route
app.use('/user', userRoutes);
app.use('/cat', catRoutes);
app.use('/dog', dogRoutes);
app.use('/', mainRoutes);

app.use((request, response, next) => {
    response.status(404);
    response.render('article', {
        pagePrimaryTitle: '404',
        includeImageSection: false,
        includeContent: true,
        content: `<h2>The file you're searching for doesn't exist</h2>`,
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});