var savemodal = {
    visible : m.prop(false),
          y : m.prop(),

    saveYConfig: function() {
    return window.pageYOffset + document.getElementById('save').getBoundingClientRect().top   
    },
    view: function(body) {
    return savemodal.visible() ? m(".modal-bg-overlay", [m(".modal", {
        style: {
            'margin-top': savemodal.y().config() + "px"
        }
    }, body())]) : ""
    }
}

var forkmodal = {
    visible : m.prop(false),
          y : m.prop(0),

    forkYConfig: function() {
        return window.pageYOffset + document.getElementById('fork').getBoundingClientRect().top - 70
    },  
    view: function(body) {
    return forkmodal.visible() ? m(".modal-bg-overlay", [m(".modal", {
        style: {
            'margin-top': forkmodal.y().config() + "px"
        }
    }, body())]) : ""
}
}


    