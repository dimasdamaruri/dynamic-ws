Ext.define('AdmindukWS.model.Method', {
    extend: 'AdmindukWS.model.Base',

    fields: [
        {
            name: 'KD_URL',
            type: 'string'
        },
        {
            name: 'KD_URL_LIST',
            type: 'string'
        },
        {
            name: 'NAMA_METODE',
            type: 'string'
        },
        {
            name: 'NAMA_INSTANSI',
            type: 'string'
        },
        {
            name: 'IS_PAGING',
            type: 'string'
        },
        {
            name: 'IS_KELUARGA',
            type: 'string'
        }
    ]
});