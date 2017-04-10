var comboStoreUserInstansi = Ext.create('AdmindukWS.store.InstansiStore');
Ext.define('AdmindukWS.view.AksesData.aksesDataMingguTerakhir.MainAksesDataMingguTerakhir', {
    extend: 'Ext.container.Container',
    alias: 'widget.MainAksesDataMingguTerakhir',
    title: 'Akses Data 1 Minggu Terakhir',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    requires: [
        'Ext.chart.*',
        'AdmindukWS.view.AksesData.aksesDataMingguTerakhir.ListAksesDataMingguan',
        'AdmindukWS.view.AksesData.aksesDataMingguTerakhir.ListSummaryAksesDataMingguan'
    ],
    initComponent: function() {
        var me = this;
        Ext.apply(this, {
            items: [
                {
                    xtype: 'panel',
                    flex: 3,
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        padding: '2'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            width: 300,
                            fieldLabel: 'Instansi',
                            name: 'NAMA_INSTANSI',
                            action: 'instansiAksesMingguTerakhir',
                            store: comboStoreUserInstansi,
                            displayField: 'INSTANSI_NEW',
                            valueField: 'NAMA_INSTANSI',
                            anchor: '30%',
                            editable: false
                        }, {
                            xtype: 'panel',
                            title: 'Akses Data 1 Minggu Terakhir',
                            name: 'aksesDataMingguPanel',
                            flex: 3,
//                            margin: '5 10 10 5',
                            padding: '5 0 0 5',
                            layout: 'fit'
                        }
                    ]
                },
                {
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
                            xtype: 'ListAksesDataMingguan',
                            name: 'gridListAksesDataMingguan'
                        },
                        {
                            flex: 1,
                            xtype: 'ListSummaryAksesDataMingguan',
                            name: 'gridListSummaryAksesDataMingguan'
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


