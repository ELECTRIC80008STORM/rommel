exports.getDogPage = (request, response, next) => {
    response.render('article', {
        bodyClass: 'center-align',
        pagePrimaryTitle: "You're In The Second Dog's Route",
        includeImageSection: true,
        imageUrl: 'https://w0.peakpx.com/wallpaper/993/1001/HD-wallpaper-cute-dog-on-snowy-landscape-white-snow-dogs-animals.jpg',
        imageAltText: 'Cute Dog Picture',
        includeMaterializeInit: true,
        materializeInitScript: `document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.materialboxed');
            var instances = M.Materialbox.init(elems, {});
        });`,
        privileges: request.session.privileges || [],
        isUserRegistered: (typeof request.session.user !== 'undefined')? true : false,
        userProfileView: (typeof request.session.user !== 'undefined')? '/user/profile' : '/user/signup',
        username: (typeof request.session.user !== 'undefined')? request.session.user.username : '',
    });
};

exports.get_root = (request, response, next) => {
    response.render('article', {
    bodyClass: 'center-align',
    pagePrimaryTitle: "You're In The Dog's Route",
    includeImageSection: true,
    imageUrl: 'https://images.ctfassets.net/f60q1anpxzid/asset-2ee2e43d43b93957a549a3d944297d31/687205eca7d573393bea77d53b2377e5/cute-dog-names-1280.jpg',
    imageAltText: 'Cute Dog Picture',
    includeButton: true,
    buttonRedirection: '/dog/dogpage',
    buttonText: "Go To The Second Dog's Route",
    includeMaterializeInit: true,
    materializeInitScript: `document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.materialboxed');
        var instances = M.Materialbox.init(elems, {});
    });`,
    privileges: request.session.privileges || [],
    isUserRegistered: (typeof request.session.user !== 'undefined')? true : false,
        userProfileView: (typeof request.session.user !== 'undefined')? '/user/profile' : '/user/signup',
        username: (typeof request.session.user !== 'undefined')? request.session.user.username : '',
    });
};