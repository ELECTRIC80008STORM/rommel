const User = require('../models/userInformation.model');

const escapeHtml = require('escape-html');

exports.get_signup = (request, response, next) => {
    response.render('userSignUp', {
        fieldTitle: 'Sign Up',
        actionTaken: 'signUp',
        fieldsRequired: `
        <div class="input-field">
            <input type="text" id="name" name="name" required>
            <label for="name">Name</label>
        </div>
        <div class="input-field">
            <input type="text" id="email" name="email" required>
            <label for="email">Email</label>
        </div>
        <div class="input-field">
            <input type="number" id="age" name="age" required>
            <label for="age">Age</label>
        </div>
        <div class="input-field">
            <p>
                <label>
                    <input name="gender" type="radio" value="Male" required>
                    <span>Male</span>
                </label>
            </p>
            <p>
                <label>
                    <input name="gender" type="radio" value="Female" required>
                    <span>Female</span>
                </label>
            </p>
        </div>
        `,
        submitButtonText: 'Continue',
    });
};

exports.post_signup = (request, response, next) => {
    const newUser = new User(
        escapeHtml(request.body.name),
        escapeHtml(request.body.email),
        escapeHtml(request.body.age),
        escapeHtml(request.body.gender),
    );
    newUser.save();
    request.session.name = newUser.name;
    response.redirect('/');
};