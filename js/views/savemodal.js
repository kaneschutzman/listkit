var app = app || {};

(function () {
    'use strict';

    app.savemodal = function(ctrl) {
        return [
                m("a.close-modal.centered", {onclick: savemodal.visible.bind(this, false)}, m("img[src='/assets/x-close.png']")),
                    m(".col-1-1", [
                        m(".maxwidth", [
                        m("p.tagline", "Your list's gonna get a short URL you can share and people can fork everywhere."),
                        m("form", [
                    m("input[placeholder='Your Nickname (optional)'][type='text']", {
                        value: ctrl.nickname(), 
                        onchange: m.withAttr('value', ctrl.nickname)
                    }),
                    m("input[placeholder='ListKit Name: *Required, see below'][type='text']", {
                        value: ctrl.lifestyle(), 
                        onchange: m.withAttr('value', ctrl.lifestyle),
                        disabled: ctrl.hasName() ? true : false
                    }),
                    ctrl.hasName() ? m("p.medium", "Every ListKit is unique! ") : m("p.medium", "Please have fun giving your list a fancy name, examples: Banana Cheesecake, 20 girl single, Couple+baby, 2 for dinner romantic, or whatever you like, it would be unique."),
                    m("input.btn-modal[type='button'][value='Save your list!']", {
                        onclick: m.route.param('userId') ? ctrl.modlist : ctrl.savelist,
                        disabled: ctrl.validate() ? false : true
                    }),
                    m("p.small", "* No login here, we don't want your personal data.")
                        ])
                    ])
                ])
        ];
    };

})();