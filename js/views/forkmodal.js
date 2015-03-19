var app = app || {};

(function () {
    'use strict';

    app.forkmodal = function(ctrl) {
        return [  
                m("a.close-modal.centered", {onclick: forkmodal.visible.bind(this, false)}, m("img[src='/assets/x-close.png']")),
                    m(".col-1-1", [
                        m(".maxwidth", [
                        m("p.tagline", "Cool you're forking this list, you can now modify it as yours and reshare. "),
                        m("form[id='save']", [
                    m("input[placeholder='Your Nickname (optional)'][type='text']", {
                        value: ctrl.nickname(), 
                        onchange: m.withAttr('value', ctrl.nickname)
                    }),
                    m("input[placeholder='ListKit Name: *Required, see below'][type='text']", {
                        onchange: m.withAttr('value', ctrl.lifestyle),
                    }),
                    m("p.medium", "Please have fun giving your list a fancy name, examples: Banana Cheesecake, 20 girl single, Couple+baby, 2 for dinner romantic, or whatever you like, it would be unique."),
                    m("input.btn-modal[type='button'][value='Fork this list!']", {
                        onclick: ctrl.savelist
                    }),
                    ]),
                    m("p.small", "* No login here, we don't want your personal data.")
                        ])
                    ])

        ];
    };

})();