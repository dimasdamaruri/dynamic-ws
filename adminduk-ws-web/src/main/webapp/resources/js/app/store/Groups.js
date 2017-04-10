Ext.define('AdmindukWS.store.Groups', {
    extend: 'AdmindukWS.store.BaseStore',
    model: 'AdmindukWS.model.Group',
    url: AdmindukWS.config.groupUrl,
    pageSize: 250,
    remoteSort: true,
    autoLoad: false
});