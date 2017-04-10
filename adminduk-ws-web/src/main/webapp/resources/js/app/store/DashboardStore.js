Ext.define('AdmindukWS.store.DashboardStore', {
    extend: 'AdmindukWS.store.BaseStore',
    model: 'AdmindukWS.model.Chart',
    url: AdmindukWS.config.servicePath + "/kode=GETDATA_LIST_GAUGE",
    pageSize: 25,
    remoteSort: true
});