module.exports = (request, response, next) => {
    let canViewCatsPages =  false;
    for (let privilege of request.session.privileges) {
        if (privilege.permission == 'viewCatsPages') {
            canViewCatsPages = true;
        }
    }

    if(canViewCatsPages) {
        next();
    } else {
        return response.redirect('/');    
    }
}