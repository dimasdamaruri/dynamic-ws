/**
 * Created with IntelliJ IDEA.
 * User: rezafit
 * Date: 3/5/13
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('AdmindukWS.store.GenericStore', {
    extend: 'AdmindukWS.store.BaseStore',
    model: 'AdmindukWS.model.GenericModel',
    url: AdmindukWS.config.servicePath,// + '/kode=GETDATA_RENCANA_HAULING',
    pageSize: 25,
    remoteSort: false,
    autoLoad: false
});