var app = app || {};

(function () {
    'use strict';
    
     app.latestbox = function(ctrl) {
        return [
            m("#latestbox", [
              m("p.title", ">> latest 5"),
           ctrl.latestlist.map(function(i) {
          return m("a.singlebox", { href : '/'+i.URL() }, i.lifestyle())
        })
            ])
        ];
    };
})();