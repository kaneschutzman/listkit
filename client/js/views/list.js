var app = app || {};

(function () {
    'use strict';
    
     app.list = function(ctrl) {
        return [
            m('writer', [
                m('input#new-item[placeholder="carrots, pasta, rice?"]', { 
                    onkeypress: app.watchInput(
                        m.withAttr('value', ctrl.title),
                        ctrl.add.bind(ctrl, ctrl.title)
                    ),
                    value: ctrl.title()
                })
            ]),
            m('section#main', [
                m('ul#items', [
                    ctrl.list.map(function(task, index) {
                        return m('li', { class: task.completed() ? 'completed' : ''}, [
                            m('.view', [
                                m('input.toggle[type=checkbox]', {
                                    onclick: m.withAttr('checked', task.completed),
                                    checked: task.completed()
                                }),
                                m('label', task.title()),
                                m('button.destroy', { onclick: ctrl.remove.bind(ctrl, index)})
                            ])
                        ])
                     })
                ])
            ]),
            ctrl.list.length == 0 ? '' : app.total(ctrl)
        ];
    };
})();