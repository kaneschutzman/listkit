var app = app || {};

(function () {
    'use strict';

    app.total = function(ctrl) {
        return m('section#total', [
            m('span', [
                m('strong', ctrl.list.length), ' total item' + (ctrl.list.length > 1 ? 's' : '')
            ])
        ]);
    }
})();
