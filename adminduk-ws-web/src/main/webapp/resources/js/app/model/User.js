Ext.define('AdmindukWS.model.User', {
    extend: 'AdmindukWS.model.Base',

    fields: [
        {
            name: 'id',
            type: 'string'
        },
        {
            name: 'nama',
            type: 'string'
        },
        {
            name: 'nip',
            type: 'string'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'telphone',
            type: 'string'
        },
        {
            name: 'handphone',
            type: 'string'
        },
        {
            name: 'username',
            type: 'string'
        },
        {
            name: 'enabled',
            type: 'boolean'
        },
        {
            name: 'groups'
        },
        {
            name: 'authorities'
        }
    ]
});