module.exports = (request, response, next) => {
    let canViewAdminFunctions =  false;
    for (let privilege of request.session.privileges) {
        if (privilege.permission == 'viewAdminFunctions') {
            canViewAdminFunctions = true;
        }
    }

    if(canViewAdminFunctions) {
        next();
    } else {
        return response.redirect('/');    
    }
}