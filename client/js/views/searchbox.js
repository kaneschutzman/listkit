var app = app || {};

(function () {
    'use strict';
    
    app.searchbox = function(ctrl) {
        return [
	          m("#searchbox", [
              m("p.title", ">> load a ListKit"),
	            m("input[placeholder='search'][type='text']", {             
       					oninput: m.withAttr('value', ctrl.search),
       					onkeyup: m.withAttr('value', ctrl.searchApi),
                value: ctrl.search()
              }),
	   		    ])
        ];
    };

})();