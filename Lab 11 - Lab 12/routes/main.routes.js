const fs = require('fs');

const express = require('express');

const router = express.Router();

const path = require('path');

const userInfo = [];

const escapeHtml = require('escape-html');

router.get('/userinfo', (request, response, next) => {
    response.render('article', {
        includeContent: true,
        content: `
        <div class="container">
            <h2>User Personal Profile Information</h2>
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
                <button class="btn waves-effect waves-light" type="submit">Submit</button>
            </form>
        </div>
        `,
    });
});

router.post('/userinfo', (request, response, next) => {
    userInfo.push({
        name: escapeHtml(request.body.name),
        age: escapeHtml(request.body.age),
        gender: escapeHtml(request.body.gender),
    });
    response.redirect('/');
});

router.get('/', (request, response, next) => {
    if(userInfo.length == 0){
        response.render('article', {
            pagePrimaryTitle: "Testing How To Handle Routes",
            includeContent: true,
            content: `
            <a href="https://docs.google.com/document/d/1201l2ge3rhdCpdNmBi7jHMV8zsxhtWfLNue8585kfr8/edit#heading=h.yigdqadcrfzr">Link To Document with the Question's Answer</a>
            `,
        });
    } else{
        response.render('article', {
            pagePrimaryTitle: "Testing How To Handle Routes",
            includeContent: true,
            content: `
            <table>
            <tr>
                <td>Name</td>
                <td>${userInfo[userInfo.length - 1].name}</td>
            </tr>
            <tr>
                <td>Age</td>
                <td>${userInfo[userInfo.length - 1].age}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td>${userInfo[userInfo.length - 1].gender}</td>
            </tr>
            </table>
            <br>
            <a href="https://docs.google.com/document/d/1201l2ge3rhdCpdNmBi7jHMV8zsxhtWfLNue8585kfr8/edit#heading=h.yigdqadcrfzr">Link To Document with the Question's Answer</a>
            `
        });
    }
    
});

module.exports = router;