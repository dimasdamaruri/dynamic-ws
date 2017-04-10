Ext.define('AdmindukWS.view.userActivity.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userActivityList',
    store: 'UserActivities',
    forceFit: true,
    title: 'User Activity',
    rowLines: true,
    columnLines: true,
    initComponent: function () {
        Ext.apply(this, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'user',
                    text: 'User Id',
                    flex: 1,
                    sortable: false,
                    renderer: function (value) {
                        if (value) {
                            return  value.id;
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'user',
                    text: 'Username',
                    flex: 0.7,
                    sortable: false,
                    renderer: function (value) {
                        if (value) {
                            return   value.username;
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'user',
                    text: 'Nama',
                    flex: 0.8,
                    sortable: false,
                    renderer: function (value) {
                        if (value) {
                            return  value.nama;
                        }
                    }
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'loginTime',
                    flex: 1.5,
                    text: 'Login Time',
                    format: 'd F Y - H:i:s'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'logoutTime',
                    flex: 1.5,
                    text: 'Logout Time',
                    format: 'd F Y - H:i:s'
                }
            ],
            dockedItems: [
                {
                    xtype: 'advancepagingtoolbar',
                    dock: 'bottom',
                    store: 'UserActivities',
                    displayInfo: true,
                    displayMsg: 'Displaying Users {0} - {1} of {2}',
                    emptyMsg: 'No User Activities to display'
                }
            ]
        });
        
        this.addListener({
            beforeclose: {
                fn: this.onClose,
                scope: this
            }
        });
        
        this.callParent(arguments);
    },
    
    onClose: function(p) {
        Ext.MessageBox.show({
            title: 'Question.',
            msg: 'Do you want to close this window ?',
            buttons: Ext.MessageBox.YESNO,
            fn: function(buttonId) {
                switch (buttonId) {
                    case 'no':
                        break;
                    case 'yes':
                        this.ownerCt.remove(p);
                        break;
                }
            },
            scope: this
        });
        return false;  // returning false to beforeclose cancels the close event
    }

});