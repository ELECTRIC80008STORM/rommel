module.exports = (request, response, next) => {
    let canViewDogsPages =  false;
    for (let privilege of request.session.privileges) {
        if (privilege.permission == 'viewDogsPages') {
            canViewDogsPages = true;
        }
    }

    if(canViewDogsPages) {
        next();
    } else {
        return response.redirect('/');    
    }
}