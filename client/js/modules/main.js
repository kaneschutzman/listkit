var list = []
var searchlist = []
var latestlist = []
var forkedlist = []
var app = {
	
error 			: m.prop(),
title 			: m.prop(''),
nickname		: m.prop(''),
lifestyle 		: m.prop(''),
search          : m.prop(''),

	listkit: function(data) {

        this.title = m.prop(data.title)
        this.completed = m.prop(false)
    },

    listkitList: function() {
        return list
    },

    searchlist: function(data) {

        this.URL = m.prop(data.URL)
        this.lifestyle = m.prop(data.lifestyle)
    },

    searchlistList: function() {
        return searchlist
    }, 

    latestlist: function(data) {

        this.URL = m.prop(data.URL)
        this.lifestyle = m.prop(data.lifestyle)
    },

    latestlistList: function() {
        return latestlist
    },

    forkedlist: function(data) {

        this.URL = m.prop(data.URL)
        this.lifestyle = m.prop(data.lifestyle)
    },

    forkedlistList: function() {
        return forkedlist
    },

    populate: function(URL, lifestyle) {

        this.searchlist.push(new app.searchlist({ URL : URL, lifestyle : lifestyle }))
    }.bind(this),

    populate2: function(URL, lifestyle) {

        this.latestlist.push(new app.latestlist({ URL : URL, lifestyle : lifestyle }))
    }.bind(this),

    populate3: function(URL, lifestyle) {

        this.forkedlist.push(new app.forkedlist({ URL : URL, lifestyle : lifestyle }))
    }.bind(this),

    getURL: function() {
		return m.route.param('userId')
	},

    add: function(title) {
            if(this.title()) {
                this.list.push(new app.listkit({ title: title() }))
                this.title('')
            }
    },

    remove: function(key) {
            this.list.splice(key, 1)
    },

    clearTitle: function() {
            this.title('')
    },

    validate: function() {    
        if (this.lifestyle() != '' && this.list.length > 0) return true
    },

    hasName: function() {    
        if (this.lifestyle() != '') return true
    },

    amountCompleted: function() {
        var amount = 0;
        
        for(var i = 0; i < this.list.length; i++)
            if(this.list[i].completed())
                amount++

        return amount
    },

    savelist: function() {
        
        
        return m.request({

                method: 'POST', url: 'http://192.168.1.102:3000/api/v1/lists/list', 
                data: { nickname: app.nickname, lifestyle: app.lifestyle, list : this.list, forked_id: app.getURL()},
                unwrapError: function(response) {return response['err']}
                }).then(function(response) {
                	list = []
                    savemodal.visible(false)
                    forkmodal.visible(false)
                    m.route('/' + response.id)
                    return response

        }, this.error)                
        }.bind(this),

    modlist: function() {
        return m.request({

                method: 'POST', url: 'http://192.168.1.102:3000/api/v1/lists/edit', 
                data: { nickname: app.nickname, lifestyle: app.lifestyle, list : this.list, id: app.getURL() },
                unwrapError: function(response) {return response['err']}
                }).then(function(response) {
                	list = []
                    savemodal.visible(false)
                    return response

        }, this.error)                
        }.bind(this),

    searchApi: function() {
    
        searchlist.length = 0; // A little Hack here.
        if (app.search() != '') {
        return m.request({
               
                method: 'POST', url: 'http://192.168.1.102:3000/api/v1/lists/search', 
                data: { lifestyle: app.search },
                unwrapError: function(response) {return response['err']}
                }).then(function(response) {
                   
                    for(var i = 0; i < response.data.length; i++) {
                    app.populate(response.data[i]._id, response.data[i].lifestyle)
                    }
                    return

        }, this.error)               
        }
    },
    latestfive: function() {
        latestlist.length = 0
        return m.request({
               
                method: 'GET', url: 'http://192.168.1.102:3000/api/v1/lists/latestfive', 
                data: {},
                unwrapError: function(response) {return response['err']}
                }).then(function(response) {
                       
                    for(var i = 0; i < response.data.length; i++) {
                    app.populate2(response.data[i]._id, response.data[i].lifestyle)
                    }  
                    return
                    
        }, this.error)               
        },

    mostforked: function() {
        forkedlist.length = 0;
        return m.request({
               
                method: 'GET', url: 'http://192.168.1.102:3000/api/v1/lists/mostforked', 
                data: {},
                unwrapError: function(response) {return response['err']}
                }).then(function(response) {
                       
                    for(var i = 0; i < response.data.length; i++) {
                    app.populate3(response.data[i]._id, response.data[i].lifestyle)
                    }  
                    return
                    
        }, this.error)               
        },

    controller: function () {
      	this.error = app.error
      	this.list = new app.listkitList()
        this.title = app.title
        this.getURL = app.getURL
        this.add = app.add
        this.remove = app.remove
        this.isVisible = app.isVisible
        this.clearTitle = app.clearTitle
        this.amountCompleted = app.amountCompleted
        this.nickname = app.nickname
        this.lifestyle = app.lifestyle
        this.hasName = app.hasName
        this.validate = app.validate
        this.savelist = app.savelist
        this.modlist = app.modlist
        this.searchlist = new app.searchlistList()
        this.search = app.search
        this.searchApi = app.searchApi
        this.latestlist = new app.latestlistList()
        this.latestfive = app.latestfive()
        this.forkedlist = new app.forkedlistList()
        this.mostforked = app.mostforked()
	}  
};