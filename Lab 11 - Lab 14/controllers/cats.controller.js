exports.getCatPage = (request, response, next) => {
    response.render('article', {
        bodyClass: 'center-align',
        pagePrimaryTitle: "You're In The Second Cat's Route",
        includeImageSection: true,
        imageUrl: 'https://i.pinimg.com/originals/b0/ca/c8/b0cac88c43bcdfd3f99abd8d3461902a.jpg',
        imageAltText: 'Cute Cat Picture',
        includeMaterializeInit: true,
        materializeInitScript: `document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.materialboxed');
            var instances = M.Materialbox.init(elems, {});
        });`});
};

exports.get_root = (request, response, next) => {
    response.render('article', {
    bodyClass: 'center-align',
    pagePrimaryTitle: "You're In The Cat's Route",
    includeImageSection: true,
    imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/kitten-playing-with-toy-mouse-royalty-free-image-590055188-1542816918.jpg',
    imageAltText: 'Cute Cat Picture',
    includeButton: true,
    buttonRedirection: '/cat/catpage',
    buttonText: "Go To The Second Cat's Route",
    includeMaterializeInit: true,
    materializeInitScript: `
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.materialboxed');
            var instances = M.Materialbox.init(elems, {});
        });
    `});
};