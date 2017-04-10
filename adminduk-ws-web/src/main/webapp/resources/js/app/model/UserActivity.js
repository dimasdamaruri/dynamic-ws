Ext.define('AdmindukWS.model.UserActivity', {
    extend: 'AdmindukWS.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'user'
        },
        {
            name: 'loginTime',
            type: 'date'
        },
        {
            name: 'logoutTime',
            type: 'date'
        }
    ]
});