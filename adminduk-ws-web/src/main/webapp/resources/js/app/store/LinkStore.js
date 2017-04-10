Ext.define('AdmindukWS.store.LinkStore', {
    extend: 'AdmindukWS.store.BaseStore',
    model: 'AdmindukWS.model.Link',
    url: AdmindukWS.config.servicePath + "/kode=GETDATA_LIST_URL",
    pageSize: 25,
    remoteSort: true,
    autoLoad: false
});