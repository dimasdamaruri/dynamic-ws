Ext.define('AdmindukWS.view.Laporan.MainAksesDataTahunan', {
    extend: 'Ext.container.Container',
    alias: 'widget.MainAksesDataTahunan',
    title: 'Rekapitulasi Akses Data Tahunan',
    //split: true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    requires: [
        'AdmindukWS.view.Laporan.ListAksesDataTahunan'
    ],

    initComponent: function() {
        var me = this;
        Ext.apply(this, {
            items: [
                {
                    xtype: 'ListAksesDataTahunan',
                    frame: true,
                    flex: 1
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


