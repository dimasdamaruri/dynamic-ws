/**
 * Created with IntelliJ IDEA.
 * User: KONOHA
 * Date: 20/08/14
 * Time: 11:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AdmindukWS.model.Propinsi', {
    extend: 'AdmindukWS.model.Base',

    fields: [
        {
            name: 'NO_PROP',
            type: 'number'
        } ,
        {
            name: 'NO_KAB',
            type: 'number'
        } ,
        {
            name: 'NAMA_PROP',
            type: 'string'
        },
        {
            name: 'KAB_NAME',
            type: 'string'
        },
        {
            name: 'IN_ID',
            type: 'string'
        } ,
        {
            name: 'IBUKOTA',
            type: 'string'
        },
        {
            name: 'IBUKOTA',
            type: 'string'
        }
    ]
});