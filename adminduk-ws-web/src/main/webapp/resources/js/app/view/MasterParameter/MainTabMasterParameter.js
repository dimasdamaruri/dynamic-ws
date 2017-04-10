Ext.define('AdmindukWS.view.MasterParameter.MainTabMasterParameter', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.MainTabMasterParameter',
    title: 'Parameter',

    requires: [
        'AdmindukWS.view.MasterParameter.ListMasterParameter',
        'AdmindukWS.view.MasterParameter.FormMasterParameter'
    ],
    initComponent: function() {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'ListMasterParameter'
                },
                {
                    xtype: 'FormMasterParameter'
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