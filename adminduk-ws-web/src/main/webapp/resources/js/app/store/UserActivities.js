Ext.define('AdmindukWS.store.UserActivities', {
    extend: 'AdmindukWS.store.BaseStore',
    model: 'AdmindukWS.model.UserActivity',
    url: AdmindukWS.config.userActivityUrl,
    pageSize: 25,
    remoteSort: true,
    sorters: {
        property: 'loginTime',
        direction: 'DESC'
    },
    autoLoad: false
});