const User = require('../models/userInformation.model');

const escapeHtml = require('escape-html');

exports.get_userRegistration = (request, response, next) => {
    response.render('userRegistration', {
        fieldTitle: 'Sign Up',
        actionTaken: 'userRegistration',
        fieldsRequired: `
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

exports.post_userRegistration = (request, response, next) => {
    const newUser = new User(
        escapeHtml(request.body.name),
        escapeHtml(request.body.age),
        escapeHtml(request.body.gender),
    );
    newUser.save();
    response.redirect('/');
};

exports.get_root = (request, response, next) => {
    usersInformation = User.fetchAll();
    if(usersInformation.length == 0) {
        response.render('article', {
            pagePrimaryTitle: "Testing How To Handle Routes",
            includeContent: true,
            content: `
            <a href="https://docs.google.com/document/d/1201l2ge3rhdCpdNmBi7jHMV8zsxhtWfLNue8585kfr8/edit#heading=h.ez6jpdwpkben">Link To Document with the Question's Answer</a>
            `,
        });
    } else {
        response.render('article', {
            pagePrimaryTitle: "Testing How To Handle Routes",
            includeContent: true,
            content: `
            <table>
            <tr>
                <td>Name</td>
                <td>${usersInformation[usersInformation.length - 1].name}</td>
            </tr>
            <tr>
                <td>Age</td>
                <td>${usersInformation[usersInformation.length - 1].age}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td>${usersInformation[usersInformation.length - 1].gender}</td>
            </tr>
            </table>
            <br>
            <a href="https://docs.google.com/document/d/1201l2ge3rhdCpdNmBi7jHMV8zsxhtWfLNue8585kfr8/edit#heading=h.yigdqadcrfzr">Link To Document with the Question's Answer</a>
            `
        });
    }   
};