var app = app || {};

(function () {
    'use strict';
    
     app.autobox = function(ctrl) {
        return [
	        m("#autobox", [
  	        ctrl.searchlist.map(function(i) {
            return m("a.singlebox", { href : '/'+i.URL() }, i.lifestyle())
        })
	   		])
        ]
    };
    
})();