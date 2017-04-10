Ext.define('AdmindukWS.controller.UserActivity', {
    extend: 'Ext.app.Controller',
    views: [ 'userActivity.List', 'userActivity.Log' ],
    models: [ 'UserActivity', 'ActivityLog' ],
    stores: [ 'UserActivities', 'ActivityLogs' ],
    refs: [
        {
            ref: 'userActivityList',
            selector: 'userActivityList'
        } ,
        {
            ref: 'userActivityPagingToolbar',
            selector: 'userActivityList pagingtoolbar'
        }
    ],

    init: function () {
        this.control({
            'userActivityList': {
                itemdblclick: this.userActivityListDblClick
            }
        });
    },


    userActivityListDblClick: function (grid, record) {
        var logWindow = Ext.widget('userActivityLog');
        if (record.data && record.data.user) {
            logWindow.setLogTitle("(" + record.data.user.username + ") " + record.data.user.nama + " [ " + Ext.Date.format(record.data.loginTime, "d F Y - H:i:s") + " to " + Ext.Date.format(record.data.logoutTime, "d F Y - H:i:s") + " ]");
            logWindow.reloadStore(record.data.id);
        }
    }

});