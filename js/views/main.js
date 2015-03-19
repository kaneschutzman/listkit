var app = app || {};

(function () {
    'use strict';

    app.watchInput = function(ontype, onenter) {
        return function(e) {
            ontype(e)
            if (e.keyCode == app.ENTER_KEY) {
            onenter()
            }
        }
    };

    app.view = function(ctrl) {
        return [
        app.main(ctrl)
        ];
    };
    
    app.main = function(ctrl) {
        return [      
        m(".col-1-1", [
            m("a.logo[href='http://listkit.co']", [m("img[src='/assets/logo.png']")])
        ]),
        m(".col-3-12", [
            m(".panel.radius", [
                m("section", app.searchbox(ctrl)),
                m("div", app.autobox(ctrl))
            ]),
            m(".panel.radius", [
                m("section", app.latestbox(ctrl))
            ]),
            m(".panel.radius", [
                m("section", app.forkedbox(ctrl))
            ]),
        ]),
        m(".col-6-12", [
            m("section.section", (ctrl.list.length == 0 ? '' : app.progress(ctrl))),
            m("section.section[id='list']", app.list(ctrl))
        ]),
        m(".col-3-12", [
            m("p", m("a.btn-darker[id='save']", {onclick: savemodal.visible.bind(this, true),
                                                 onmouseup: savemodal.y({config: savemodal.saveYConfig})  
            }, "save")),
            m("p", m.route.param('userId') ? [m("a.btn-lighter[id='fork']", {onclick: forkmodal.visible.bind(this, true),
                                                                             onmouseup: forkmodal.y({config: forkmodal.forkYConfig})
                                                                         }, "fork")] : [m("a.btn-lighter[disabled]", "fork")]),
            m(".panel.radius.sharebox", [
                m("section", m.route.param('userId') ? app.sharebox(ctrl) : '')
            ])
        ]),
        savemodal.view(function() {
            return app.savemodal(ctrl)
        }),
        forkmodal.view(function() {
            return app.forkmodal(ctrl)
        })
    ];
    };

})();

    