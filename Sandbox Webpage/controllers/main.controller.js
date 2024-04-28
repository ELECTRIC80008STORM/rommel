const fetch = require('node-fetch'); // Simplifies the use of APIs

exports.get_uploadImage = (request, response, next) => {
    response.render('uploadImage', {
        csrfToken: request.csrfToken(),
        privileges: request.session.privileges || [],
        imageUrl: request.session.uploadedImage || '',
        isUserRegistered: (typeof request.session.user !== 'undefined')? true : false,
        userProfileView: (typeof request.session.user !== 'undefined')? '/user/profile' : '/user/signup',
        username: (typeof request.session.user !== 'undefined')? request.session.user.username : '',
    });
};

exports.post_uploadImage = (request, response, next) => {
    // Ensure there's a file in the request
    if (request.file) {
        const filename = request.file.filename;
        request.session.uploadedImage = '/uploads/' + filename;
    }

    response.render('uploadImage', {
        privileges: request.session.privileges || [],
        imageUrl: request.session.uploadedImage || '',
        isUserRegistered: (typeof request.session.user !== 'undefined')? true : false,
        userProfileView: (typeof request.session.user !== 'undefined')? '/user/profile' : '/user/signup',
        username: (typeof request.session.user !== 'undefined')? request.session.user.username : '',
    });
};

exports.get_root = (request, response, next) => {
    
    const url = 'https://api.thecatapi.com/v1/images/search?limit=9';
    const api_key = 'live_AfdDv0ksJCKzy7VRrJL2fvNvgSH2nwUUgzZijWZAUtjWMaWNhfBGpx6BrVrEQKnn';

    fetch(url, { headers: { 'x-api-key': api_key } })
    .then((response) => response.json())
    .then((cats) => {
        console.log(cats);
        response.render('article', {
            isUserRegistered: (typeof request.session.user !== 'undefined')? true : false,
            userProfileView: (typeof request.session.user !== 'undefined')? '/user/profile' : '/user/signup',
            username: (typeof request.session.user !== 'undefined')? request.session.user.username : '',
            pagePrimaryTitle: "Testing How To Handle Routes",
            includeContent: true,
            content: `
            <a href="https://docs.google.com/document/d/1201l2ge3rhdCpdNmBi7jHMV8zsxhtWfLNue8585kfr8">Link To Document with the Question's Answer</a>
            `,
            privileges: request.session.privileges || [],
            catImagesShown: true,
            cats: cats
        });
    })
    .catch(error => {
        console.error('Error fetching cat images:', error);
        response.status(500).send('Unable to load cat images');
    })
};