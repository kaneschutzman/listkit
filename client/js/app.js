var app = app || {};

(function( window ) {
    'use strict';

    app.ENTER_KEY = 13;

 	m.route.mode = 'hash';
    m.route(document.getElementById('listkit'), '/', {
        '/'        : app,
        '/:userId' : loadList
    });

})(window);
