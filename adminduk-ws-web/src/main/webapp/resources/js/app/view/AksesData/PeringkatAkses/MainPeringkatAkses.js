Ext.define('AdmindukWS.view.AksesData.PeringkatAkses.MainPeringkatAkses', {
    extend: 'Ext.container.Container',
    alias: 'widget.MainPeringkatAkses',
    title: 'Peringkat Akses',
    //split: true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    requires: [
        'AdmindukWS.view.AksesData.PeringkatAkses.ListPeringkatAkses'
    ],
    generateData: function() {
        return AdmindukWS.columnStatistikDataPeringkatAkses;
    },
    initComponent: function() {
        var me = this;
        Ext.apply(this, {
            items: [
                {
                    xtype: 'panel',
                    name: 'peringkatAksesPanel',
                    title: 'Akses Data Per Status',
                    flex: 3,
                    padding: '5 0 0 5',
                    layout: 'fit'
                },{
                    xtype: 'container',
                    frame: true,
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        padding: '2'
                    },
                    items: [
                        {
                            flex: 1,
                            xtype: 'ListPeringkatAkses',
                            name: 'gridListPeringkatAkses'
                        }
                    ]
                }
            ], tbar: [
                {
                    itemId: 'chartRefresh',
                    action: 'refresh',
                    text: 'Refresh',
                    iconCls: 'fam-arrow-refresh'
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


