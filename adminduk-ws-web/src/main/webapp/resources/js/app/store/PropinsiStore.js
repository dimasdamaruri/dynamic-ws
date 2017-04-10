/**
 * Created with IntelliJ IDEA.
 * User: KONOHA
 * Date: 20/08/14
 * Time: 11:58
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AdmindukWS.store.PropinsiStore', {
    extend: 'AdmindukWS.store.BaseStore',
    model: 'AdmindukWS.model.Propinsi',
    url: AdmindukWS.config.servicePath + "/kode=GET_LIST_PROPINSI",
    pageSize: 25,
    remoteSort: true,
    autoLoad: false
});