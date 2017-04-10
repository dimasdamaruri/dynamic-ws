Ext.define('AdmindukWS.view.user.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userList',
    store: 'Users',
    forceFit: true,
    title: 'User',
    rowLines: true,
    columnLines: true,
    requires: [
        'Ext.ux.RowExpander'
    ],
    plugins: [
        {
            ptype: 'rowexpander',
            expandOnDblClick: false,
            rowBodyTpl: [
                '<div style="background-color: #dff0d8;padding: 5px;">' ,
                '<p>Group : </p>' ,
                '<ul>',
                '<tpl for="groups">' ,
                '<li><p><i class="fam-bullet-green"></i>{nama}</p></li>',
                '</ul>',
                '</tpl>',
                '<p>Authority : </p>' ,
                '<ul>',
                '<tpl for="authorities">' ,
                '<li><p><i class="fam-bullet-green"></i>{authority}</p></li>',
                '</ul>',
                '</tpl>',
                '</div>'
            ]
        }
    ],
    initComponent: function () {
        Ext.apply(this, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nip',
                    text: 'NIP'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nama',
                    text: 'Nama'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'username',
                    text: 'Username'
                },
                {
                    xtype: 'booleancolumn',
                    dataIndex: 'enabled',
                    trueText: 'Ya',
                    falseText: 'Tidak',
                    text: 'Enabled'
                }
            ],

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'New User',
                            disabled: false,
                            action: 'add',
                            iconCls: 'fam-add'
                        },
                        {
                            text: 'Delete User',
                            disabled: true,
                            action: 'delete',
                            iconCls: 'fam-delete'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: 'Users',
                    displayInfo: true,
                    displayMsg: 'Displaying Users {0} - {1} of {2}',
                    emptyMsg: 'No Users to display'
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