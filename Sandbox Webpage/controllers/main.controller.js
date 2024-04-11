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
    console.log('Filename: ')
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
    // console.log(request.session.user);
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
    });
};