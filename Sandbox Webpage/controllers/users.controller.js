const User = require('../models/userInformation.model');

const escapeHtml = require('escape-html');

exports.get_signup = (request, response, next) => {
    response.render('userSignUp');
};

exports.post_signup = (request, response, next) => {
    const newUser = new User(
        escapeHtml(request.body.username),
        escapeHtml(request.body.name),
        escapeHtml(request.body.email),
        escapeHtml(request.body.age),
        escapeHtml(request.body.gender),
    );
    newUser.save()
    .then(() => {
        request.session.user = newUser;
        response.redirect('/');
    })
    .catch((error) => {
        console.log(error);
        response.redirect('/signup');
    });
};

// Change later when user is authenticated
exports.get_profile = (request, response, next) => {
    const username = request.session.user.username;
    User.fetchOne(username)
        .then(([rows, fieldData]) => {
            response.render('userProfile', {
                isUserRegistered: (typeof request.session.user !== 'undefined')? true : false,
                userProfileView: '/user/profile',
                userInfo: rows[0],
                username: username,
            });
        })
        .catch((error) => {
            console.log(error);
            response.redirect('/signup');
        });
};

exports.get_edit_profile = (request, response, next) => {
    const username = request.session.user.username;
    User.fetchOne(username)
        .then(([rows, fieldData]) => {
            response.render('edit-profile', {
                isUserRegistered: true,
                userProfileView: '/user/profile',
                userInfo: rows[0],
                username: username,
            });
        })
        .catch((error) => {
            console.log(error);
            response.redirect('/user/edit-profile');
        });
};

exports.post_edit_profile = (request, response, next) => {
    const username = request.session.user.username;
    const name = escapeHtml(request.body.name);
    const email = escapeHtml(request.body.email);
    const age = escapeHtml(request.body.age);
    const gender = escapeHtml(request.body.gender);
    User.update(username, name, email, age, gender)
    .then(() => {
        request.session.user = {username, name, email, age, gender};
        response.redirect('/user/profile');
    })
    .catch((error) => {
        console.log(error);
        response.redirect('/user/edit-profile');
    });
};

exports.get_admin = (request, response, next) => {
    const username = request.session.user.username;
    User.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('admin', {
            isUserRegistered: true,
            userProfileView: '/user/profile',
            users: rows,
            username: username || '',
        });
    })
    .catch((error) => {
        console.log(error);
        response.redirect('/');
    });
};