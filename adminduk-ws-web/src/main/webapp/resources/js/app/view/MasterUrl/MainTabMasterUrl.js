Ext.define('AdmindukWS.view.MasterUrl.MainTabMasterUrl', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.MainTabMasterUrl',
    title: 'WS Server',
    //split: true,

    requires: [
        'AdmindukWS.view.MasterUrl.ListMasterUrl',
        'AdmindukWS.view.MasterUrl.FormMasterUrl'
    ],
    initComponent: function() {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'ListMasterUrl'
                },
                {
                    xtype: 'FormMasterUrl'
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