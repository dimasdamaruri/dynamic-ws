Ext.define('AdmindukWS.view.Instansi.MainTabInstansi', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.MainTabInstansi',
    title: 'Instansi',
    //split: true,

    requires: [
        'AdmindukWS.view.Instansi.ListInstansi',
        'AdmindukWS.view.Instansi.FormInstansi'
    ],
    initComponent: function() {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'ListInstansi'
                },
                {
                    xtype: 'FormInstansi'
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