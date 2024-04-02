module.exports = (request, response, next) => {
    let canViewUserData =  false;
    for (let privilege of request.session.privileges) {
        if (privilege.privilege == 'viewUserData') {
            canViewUserData = true;
        }
    }

    if(canViewUserData) {
        next();
    } else {
        return response.redirect('/');    
    }
}