Ext.define('AdmindukWS.model.Base', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'CREATE_BY',
            type: 'string'
        },
        {
            name: 'UPDATE_BY',
            type: 'string'
        },
        {
            name: 'CREATE_DATE',
            type: 'date'
        },
        {
            name: 'UPDATE_DATE',
            type: 'date'
        }
    ]
});