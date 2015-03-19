var app = app || {};

(function () {
    'use strict';

    app.sharebox = function(ctrl) {
        return [
          m("p.title", ">> share via text"),
              m('.slink', [
                m("div.url", "http://listkit.co/"+ m.route.param('userId')) 
              ]),
              m('.slink', [
                m("a.btn-blue[href=mailto:?subject=You are receving a list from ListKit!&body="+ "http://listkit.co/"+ m.route.param('userId') +"][target=_blank]", "Send your ListKit URL via e-mail.") 
              ]), 
              m('.slink', [
                m("div.qr", "QR CODE"),
                m("img[src='http://api.qrserver.com/v1/create-qr-code/?data=" + "http://listkit.co/" + m.route.param('userId') + "&size=100x100&bgcolor=ededed']")
              ]),
        ];	
    };
})();