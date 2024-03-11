exports.get_root = (request, response, next) => {
    response.render('article', {
        isUserRegistered: (typeof request.session.name !== 'undefined')? true : false,
        userProfileView: '/user/signup',
        username: (typeof request.session.name !== 'undefined')? request.session.name : '',
        pagePrimaryTitle: "Testing How To Handle Routes",
        includeContent: true,
        content: `
        <a href="https://docs.google.com/document/d/1201l2ge3rhdCpdNmBi7jHMV8zsxhtWfLNue8585kfr8/edit#heading=h.ptzwajrrd986">Link To Document with the Question's Answer</a>
        `,
    });
};