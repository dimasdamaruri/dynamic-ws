Ext.define('AdmindukWS.view.userActivity.Log', {
    extend: 'Ext.window.Window',
    alias: 'widget.userActivityLog',
    title: 'User Activity Log',
    layout: 'fit',
    autoShow: true,
    resizable: true,
    maximizable: true,
    maximized: true,
    modal: true,
    height: 400,
    width: 600,
    setLogTitle: function (title) {
        this.setTitle("User Activity Log : " + title);
    },
    reloadStore: function (userActivityId) {
        var url = AdmindukWS.config.userActivityUrl + userActivityId + "/log/";
        var store = this.down('gridpanel').getStore();
        store.getProxy().url = url;

        store.reload();
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'gridpanel',
                store: 'ActivityLogs',
                forceFit: true,
                rowLines: true,
                columnLines: true,
                requires: [
                    'Ext.ux.RowExpander'
                ],
                columns: [
                    {
                        xtype: 'datecolumn',
                        dataIndex: 'createdAt',
                        text: 'Time',
                        format: 'd F Y - H:i:s'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'userAction',
                        text: 'User Action'
                    }
                ],
                plugins: [
                    {
                        ptype: 'rowexpander',
                        expandOnDblClick: true,
                        rowBodyTpl: [
                            '<div style="background-color: #dff0d8;padding: 5px;">' ,
                            '<tpl for=".">' ,
                            " <p> {[Ext.Date.format(values.createdAt,'d F Y - H:i:s')]}</p>",
                            ' <p> {userAction}</p>',
                            '</tpl>',
                            '</div>'
                        ]
                    }
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        store: 'ActivityLogs',
                        displayInfo: true,
                        displayMsg: 'Displaying Activity Logs {0} - {1} of {2}',
                        emptyMsg: 'No Activity Logs to display'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Close',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});