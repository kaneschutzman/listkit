var app = app || {};

(function () {
    'use strict';
    
     app.forkedbox = function(ctrl) {
        return [
            m("#forkedbox", [
              m("p.title", ">> most forked"),
           ctrl.forkedlist.map(function(i) {
          return m("a.singlebox", { href : '/'+i.URL() }, i.lifestyle());
        })
            ])
        ];
    };

})();