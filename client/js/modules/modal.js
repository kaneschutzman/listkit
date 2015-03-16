var savemodal = {}
savemodal.visible = m.prop(false)
savemodal.view = function(body) {
  	return savemodal.visible() ? m(".modal", body()) : ""
}

var forkmodal = {}
forkmodal.visible = m.prop(false)
forkmodal.view = function(body) {
  	return forkmodal.visible() ? m(".modal", body()) : ""
}
