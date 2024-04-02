module.exports = (request, response, next) => {
    let canViewAnimalRoutes =  false;
    for (let privilege of request.session.privileges) {
        if (privilege.privilege == 'viewAnimalRoutes') {
            canViewAnimalRoutes = true;
        }
    }

    if(canViewAnimalRoutes) {
        next();
    } else {
        return response.redirect('/');    
    }
}