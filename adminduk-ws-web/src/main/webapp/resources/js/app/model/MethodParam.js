Ext.define('AdmindukWS.model.MethodParam', {
    extend: 'AdmindukWS.model.Base',

    fields: [
        {
            name: 'COLUMN_NAME',
            type: 'string'
        },
        {
            name: 'ID_URUT',
            type: 'string'
        },
        {
            name: 'KETERANGAN',
            type: 'string'
        },
        {
            name: 'TIPE_DATA',
            type: 'string'
        },
        {
            name: 'IS_LIKE_VIEW',
            type: 'string'
        },
        {
            name: 'KD_URL',
            type: 'string'
        },
        {
            name: 'KD_URL_LIST',
            type: 'string'
        },
        {
            name: 'FLAG',
            type: 'boolean',
            defaultValue : false
        },
        {
            name: 'IS_LIKE',
            type: 'boolean',
            defaultValue : false
        }
    ]
});