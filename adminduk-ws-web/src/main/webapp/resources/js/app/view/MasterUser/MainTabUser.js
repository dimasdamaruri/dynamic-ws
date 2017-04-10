Ext.define('AdmindukWS.view.MasterUser.MainTabUser', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.MainTabUser',
    title: 'User',
    //split: true,

    requires: [
        'AdmindukWS.view.MasterUser.ListUser',
        'AdmindukWS.view.MasterUser.FormUser'
    ],
    initComponent: function() {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'ListUser'
                },
                {
                    xtype: 'FormUser'
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