Ext.define('AdmindukWS.store.Roles', {
    extend: 'AdmindukWS.store.BaseStore',
    model: 'AdmindukWS.model.Role',
    url: AdmindukWS.config.roleUrl,
    pageSize: 250,
    remoteSort: true,
    autoLoad: false
});