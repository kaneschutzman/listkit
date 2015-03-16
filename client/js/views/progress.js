var app = app || {};

(function () {
    'use strict';

    app.progress = function(ctrl) {
        return [
            m('.progress', [
          		m("span.meter", {style: {"width": ctrl.amountCompleted()/ctrl.list.length*100 +'%' }}),
          		m("p.vcenter", m("strong", "ListKit: "), ctrl.lifestyle())
            ])
        ];
    };

})();