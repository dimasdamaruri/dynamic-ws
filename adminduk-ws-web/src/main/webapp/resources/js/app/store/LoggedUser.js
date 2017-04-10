Ext.define('AdmindukWS.store.LoggedUser', {
    extend: 'Ext.data.Store',

    requires: [
        'AdmindukWS.model.User'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([
            Ext.apply({
                storeId: 'LoggedUserJsonStore',
                model: 'AdmindukWS.model.User',
                proxy: {
                    type: 'ajax',
                    url: AdmindukWS.config.loggedUserUrl,
                    reader: {
                        type: 'json'
                    }
                },
                autoLoad: true
            }, cfg)
        ]);
    }
});