exports.get_root = (request, response, next) => {
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