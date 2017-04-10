Ext.define('AdmindukWS.store.GridDashboardStore', {
    extend: 'AdmindukWS.store.BaseStore',
    model: 'AdmindukWS.model.GridDashboard',
    url: AdmindukWS.config.servicePath + "/kode=GETDATA_LIST_GAUGE_ALL",
    pageSize: 25,
    remoteSort: true
});