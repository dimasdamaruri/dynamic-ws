Ext.define('AdmindukWS.store.BaseStore', {
    extend: 'Ext.data.Store',
    model: '',
    url: '',
    requires: [
        this.model
    ],
    sorters: '',
    pageSize: 25,
    remoteSort: false,
    remoteFilter: false,
    autoLoad: true,
    _filters: null,
    _extraParams: null,
    _deletedParams: null,
    _searchParam: "",
    constructor: function (cfg) {
        var self = this;
        cfg = cfg || {};
        self.callParent([
            Ext.apply({
                model: self.model,
                proxy: {
                    type: 'ajax',
                    pageParam: 'page.page',
                    url: self.url,
                    reader: {
                        type: 'json',
                        root: 'content',
                        totalProperty: 'totalElements'
                    },

                    listeners: {
                        exception: function(proxy, response, options) {
                            console.log("--> proxy ", proxy , " response ", response, " options ", options);

                            console.log("Login page ? == ", response.responseText.indexOf("Silahkan mengisi username"));

                            if (response.responseText.indexOf("Silahkan mengisi username") > 0) {
                                window.location = "loginpage";
                            }
                        }
                    }
                },
                autoLoad: self.autoLoad
            }, cfg)
        ]);
    },

    setFilters: function (filterObjects) {
        var self = this;
        if (Ext.isArray(filterObjects)) {
            self._filters = filterObjects;
        } else if (Ext.isObject(filterObjects)) {
            self._filters.push(filterObjects);
        } else {
            self._filters = null;
        }
    },


    clearFilters: function () {
        var self = this;
        self._filters = null;
    },

    setExtraParams: function (extraParams) {
        var self = this;
        if (Ext.isEmpty(extraParams)) {
            self._extraParams = null;
        } else {
            self._extraParams = extraParams;
        }

    },
    clearExtraParams: function () {
        var self = this;
        self._deletedParams = self._extraParams;
        self._extraParams = null;
    },
    setSearchParam: function (searchParam) {
        this._searchParam = searchParam;
    },
    getSearchParam: function () {
        return this._searchParam;
    },
    listeners: {
        'beforeload': function (store, operation) {

            var self = this;

            operation.params = {};

            operation.params['searchKey'] = self._searchParam;

            if (!Ext.isEmpty(self.pageSize)) {
                operation.params['page.size'] = self.pageSize;
            }

            if (!Ext.isEmpty(operation.sorters) && self.remoteSort) {
                var sorter = operation.sorters[0];
                operation.params["page.sort"] = sorter.property;
                operation.params["page.sort.dir"] = sorter.direction;
            }

            if (!Ext.isEmpty(self._filters)) {
                operation.params["filters"] = Ext.JSON.encode(self._filters);
            }


            if (!Ext.isEmpty(self._extraParams)) {
                if (Ext.isObject(self._extraParams)) {
                    Ext.iterate(self._extraParams, function (param) {
                        operation.params[param] = self._extraParams[param];
                    });
                } else {
                    self._extraParams = null;
                }
            } else {

                Ext.iterate(self._deletedParams, function (param) {
                    operation.params[param] = "";
                });
                self._deletedParams = null;
            }

        }
    }
});