Ext.define('AdmindukWS.model.MasterUser', {
    extend: 'AdmindukWS.model.Base',

    fields: [
        {
            name: 'USER_ID',
            type: 'string'
        },
        {
            name: 'PASSWORD',
            type: 'string'
        },
        {
            name: 'KUOTA',
            type: 'string'
        },
        {
            name: 'USERNAME',
            type: 'string'
        },
        {
            name: 'NAMA_INSTANSI',
            type: 'string'
        },
        {
            name: 'KETERANGAN',
            type: 'string'
        },
        {
            name: 'IP_ADDRES',
            type: 'string'
        },
        {
            name: 'NAMA_PROP',
            type: 'string'
        },
        {
            name: 'KAB_NAME',
            type: 'string'
        },
        {
            name: 'NIK',
            type: 'string'
        },
        {
            name: 'NOPEG',
            type: 'string'
        },
        {
            name: 'OCUPATION',
            type: 'string'
        },
        {
            name: 'AKTIF',
            type: 'string'
        }
    ]
});