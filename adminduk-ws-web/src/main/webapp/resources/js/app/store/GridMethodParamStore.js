Ext.define('AdmindukWS.store.GridMethodParamStore', {
    extend: 'AdmindukWS.store.BaseStore',
    model: 'AdmindukWS.model.MethodParam',
    url: AdmindukWS.config.servicePath + "/kode=",
    pageSize: 25,
    remoteSort: true,
    autoLoad: false
});