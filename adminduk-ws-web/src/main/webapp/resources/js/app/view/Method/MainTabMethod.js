Ext.define('AdmindukWS.view.Method.MainTabMethod', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.MainTabMethod',
    title: 'Metode',

    //split: true,
    requires: [
        'AdmindukWS.view.Method.HeaderMainListMethod',
        'AdmindukWS.view.Method.FormMethod'
    ],

    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'HeaderMainListMethod'
                },
                {
                    id: 'FormMethod',
                    xtype: 'FormMethod'
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