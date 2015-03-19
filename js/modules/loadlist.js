var loadList = {

    error: m.prop(),

    getURL: function() {
        return m.route.param('userId')
    },

    autoadd: function(title) {
        this.list.push(new app.listkit({
            title: title
        }))
    }.bind(this),

    load: function() {
        list = [];
        return m.request({
            method: 'GET',
            url: 'http://localhost:3000/api/v1/lists/load',
            data: {
                id: loadList.getURL()
            },
            unwrapError: function(response) {
                return response['err']
            }
        }).then(function(response) {

            for (var i = 0; i < response.data.length; i++) {
                loadList.autoadd(response.data[i].title)
            }
            app.lifestyle(response.lifestyle)
            return;
        }, this.error)
    },

    controller: function() {
        this.error = loadList.error
        this.load = loadList.load()
        this.list = new app.listkitList()
        this.title = app.title
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

    },

    view: function(ctrl) {
        return [
            app.main(ctrl)
        ];
    }
};