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

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// "body-parser" is a third party midleware that allows you to analyze
// requests' bodies, as of now, it comes with Express, so it doesn't need to be install again
// const bodyParser = require('body-parser');

// It allows you to analyze requests' bodies with content type
// "application/x-www-form-urlencoded", meaning, it can give sense to
// the forms' data
app.use(express.urlencoded({extended: false}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const multer = require('multer');

// Configuration constant to handle the storage of files
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'public/uploads');
    },
    filename: (request, file, callback) => {
        // Here we add the timestamp to the file name so that there can't be two files with the same name
        callback(null, Number(new Date()).toString() + file.originalname);
    },
});

// File filter for validating MIME types
const fileFilter = (request, file, callback) => {
    if (file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

// Here we use the configuration constant and set files to only accept one per post
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

// TODO: Change for double Csrf
const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection); 

app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
});

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