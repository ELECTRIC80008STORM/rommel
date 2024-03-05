var isPasswordSafe = false;

function isPasswordLongEnough(storedPassword) {
    return storedPassword.length >= 8;
}

function containsWhiteSpaces(storedPassword){
    return /\s/.test(storedPassword);
}

function containsSpecialSymbol(storedPassword) {
    return /[@#$%&,.:;]/.test(storedPassword);
}

function containsNumber(storedPassword) {
    return /\d/.test(storedPassword);
}

function containsCapitalLetter(storedPassword) {
    return /[A-Z]/.test(storedPassword);
}

function passwordValidation(storedPassword){

    if(!document.getElementById('passwordValidation').disabled){
        document.getElementById('passwordValidation').disabled = true;
    }

    if(isPasswordSafe){
        isPasswordSafe = false;
    }

    if(!storedPassword || storedPassword.trim() === ''){
        document.getElementById('tipsGivenToUser').textContent = "";
        return;
    }

    if(containsWhiteSpaces(storedPassword)){
        document.getElementById('tipsGivenToUser').textContent = "Your password contains white spaces.";
    } else if(!isPasswordLongEnough(storedPassword)){
        document.getElementById('tipsGivenToUser').textContent = "Your password doesn't seem secure enough, try adding at least eight characters.";
    } else if(!containsSpecialSymbol(storedPassword)){
        document.getElementById('tipsGivenToUser').textContent = "Your password doesn't seem secure enough yet, try adding one of the following symbols: [@#$%&,.:;]";
    } else if(!containsNumber(storedPassword)){
        document.getElementById('tipsGivenToUser').textContent = "Your password can still be improved, try adding at least one number.";
    } else if(!containsCapitalLetter(storedPassword)){
        document.getElementById('tipsGivenToUser').textContent = "Your password could be safer if you add at least one Capital Letter.";
    } else{
        document.getElementById('tipsGivenToUser').textContent = "Congrats!!! Now you'll be better protected. Type your password again below ;)";
        document.getElementById('passwordValidation').disabled = false;
        isPasswordSafe = true;
    }

}

document.addEventListener('DOMContentLoaded', function() {
    var passwordInput = document.getElementById('password');

    passwordInput.addEventListener('input', function() {
        var storedPassword = this.value;
        passwordValidation(storedPassword);
        
    });
});

function changeTitleTextStyle() {
    var title = document.querySelector('.brand-logo.center');

    if (title.style.fontWeight === 'bold') {
        title.style.fontWeight = 'normal';
        title.style.fontStyle = 'italic';
    } else if (title.style.fontStyle === 'italic') {
        title.style.fontStyle = 'normal';
    } else {
        title.style.fontWeight = 'bold';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var messageElement = document.getElementById('messagePlaceholder');
        messageElement.textContent = "Have you tried clicking the title?";
        messageElement.style.fontWeight = 'bold';
        messageElement.style.textAlign = 'center';
    }, 5000); // 5000 milliseconds = 5 seconds
});

document.addEventListener('DOMContentLoaded', function() {
    var passwordInput = document.getElementById('password');
    var passwordValidationInput = document.getElementById('passwordValidation');

    passwordValidationInput.addEventListener('input', function() {
        if(passwordInput.value === passwordValidationInput.value && isPasswordSafe) {
            document.getElementById('tipsGivenToUser').textContent = "You're done! You've created a safe password and proven that you remember it. You should store it in a Password Manager though.";
        } else {
            document.getElementById('tipsGivenToUser').textContent = "The passwords don't match. Make sure to write it like the password you just made!!";
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var messageElement = document.getElementById('linkToDocument');
        messageElement.innerHTML = '<a href="https://docs.google.com/document/d/1201l2ge3rhdCpdNmBi7jHMV8zsxhtWfLNue8585kfr8/edit#heading=h.cz1aoqcbp4qw">Link To The Document With The Questions And References</a>';
        messageElement.style.textAlign = 'center';
    }, 8000); // 8000 milliseconds = 8 seconds
});