/**
 * Created with IntelliJ IDEA.
 * User: KONOHA
 * Date: 22/08/14
 * Time: 22:24
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AdmindukWS.model.Parameter', {
    extend: 'AdmindukWS.model.Base',

    fields: [
        {
            name: 'COLUMN_NAME',
            type: 'string'
        },
        {
            name: 'KETERANGAN',
            type: 'string'
        }
    ]
});