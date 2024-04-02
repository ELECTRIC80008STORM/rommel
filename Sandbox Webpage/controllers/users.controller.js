const User = require('../models/userInformation.model');
const bcrypt = require('bcryptjs');

const escapeHtml = require('escape-html');

exports.get_signup = (request, response, next) => {
    response.render('userSignUp', {
        usernameInUse: false,
        includeMaterializeInit: true,
        materializeInitScript: `
        document.getElementById('showPassword').addEventListener('change', function() {
            var passwordInput = document.getElementById('password');
            if (this.checked) {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        });        
        `,
    });
};

exports.post_signup = (request, response, next) => {
    const username = escapeHtml(request.body.username);
    User.fetchOne(username)
        .then(([rows]) => {
            if (rows.length > 0) {
                response.render('userSignUp', {
                    usernameInUse: true,
                });
            } else {
                const newUser = new User(
                    username,
                    escapeHtml(request.body.name),
                    escapeHtml(request.body.password),
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
            }
        })
        .catch((error) => {
            console.log(error);
            response.redirect('/signup');
        });
};

exports.get_signin = (request, response, next) => {
    response.render('userSignIn', {
        includeMaterializeInit: true,
        materializeInitScript: `
            function togglePasswordVisibility() {
                const passwordInput = document.getElementById('password');
                const showPasswordCheckbox = document.getElementById('showPassword');
                
                if (showPasswordCheckbox.checked) {
                    passwordInput.type = 'text';
                } else {
                    passwordInput.type = 'password';
                }
            }
        `,
    });
};

exports.post_signin = (request, response, next) => {
    const username = escapeHtml(request.body.username);
    User.fetchOne(username)
        .then(([users]) => {
            if (users.length > 0) {
                const user = users[0];
                bcrypt.compare(request.body.password, user.password)
                    .then((doMatch) => {
                        if(doMatch) {
                            request.session.user = user;
                            request.session.isLoggedIn = true;
                            response.redirect('/');
                        } else {
                            request.session.error = "User &/or password are incorrect";
                            console.log(request.session.error);
                            response.redirect('/user/signin');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                request.session.error = "User &/or password are incorrect";
                console.log(request.session.error);
                response.redirect('/user/signin');
            }
        })
        .catch((error) => {
            console.log(error);
            response.redirect('/user/signin');
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
            response.redirect('/user/signup');
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
    const password = escapeHtml(request.body.password);
    const email = escapeHtml(request.body.email);
    const age = escapeHtml(request.body.age);
    const gender = escapeHtml(request.body.gender);
    User.update(username, name, password, email, age, gender)
    .then(() => {
        request.session.user = {username, name, password, email, age, gender};
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