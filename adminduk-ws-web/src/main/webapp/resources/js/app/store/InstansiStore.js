Ext.define('AdmindukWS.store.InstansiStore', {
    extend: 'AdmindukWS.store.BaseStore',
    model: 'AdmindukWS.model.Instansi',
    url: AdmindukWS.config.servicePath + "/kode=GETDATA_LIST_INSTANSI_ALL",
    pageSize: 25,
    remoteSort: true
});