Ext.define('AdmindukWS.store.ViewStore', {
    extend: 'AdmindukWS.store.BaseStore',
    model: 'AdmindukWS.model.View',
    url: AdmindukWS.config.servicePath + "/kode=GETDATA_LIST_VIEW",
    pageSize: 25,
    remoteSort: true,
    autoLoad: false
});