var comboStoreUserInstansi = Ext.create('AdmindukWS.store.InstansiStore');
Ext.define('AdmindukWS.view.AksesData.AksesDataBulanTerakhir.MainAksesDataBulanTerakhir', {
    extend: 'Ext.container.Container',
    alias: 'widget.MainAksesDataBulanTerakhir',
    title: 'Akses Data 1 Bulan Terakhir',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    //split: true,

    requires: [
        'Ext.chart.*',
        'AdmindukWS.view.AksesData.AksesDataBulanTerakhir.ListAksesDataBulanTerakhir',
        'AdmindukWS.view.AksesData.AksesDataBulanTerakhir.ListSummaryAksesDataBulanan'
    ],
    generateData: function() {
        return AdmindukWS.columnStatistikDataAksesBulanTerakhir;
    },
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
                            store: comboStoreUserInstansi,
                            action: 'instansiAksesBulanTerakhir',
                            displayField: 'INSTANSI_NEW',
                            valueField: 'NAMA_INSTANSI',
                            anchor: '30%',
                            editable: false
                        },
                        {
                            xtype: 'panel',
                            flex: 3,
                            name:'aksesDataBulanTerakhirPanel',
                            title: 'Akses Data 1 Bulan Terakhir',
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
                            xtype: 'ListAksesDataBulanTerakhir',
                            name: 'gridListAksesDataBulanTerakhir'
                        },
                        {
                            flex: 1,
                            xtype: 'ListSummaryAksesDataBulanan',
                            name: 'gridListSummaryAksesDataBulanan'
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


