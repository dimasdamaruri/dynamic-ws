Ext.define('AdmindukWS.store.Users', {
    extend: 'AdmindukWS.store.BaseStore',
    model: 'AdmindukWS.model.User',
    url: AdmindukWS.config.userUrl,
    pageSize: 25,
    remoteSort: true,
    autoLoad: false
});