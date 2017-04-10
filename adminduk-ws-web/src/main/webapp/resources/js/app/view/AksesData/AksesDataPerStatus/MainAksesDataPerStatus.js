var cmbStoreInstansiPerStatus = Ext.create('AdmindukWS.store.InstansiStore');
Ext.define('AdmindukWS.view.AksesData.AksesDataPerStatus.MainAksesDataPerStatus', {
    extend: 'Ext.container.Container',
    alias: 'widget.MainAksesDataPerStatus',
    title: 'Akses Data Per Status',
    //split: true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    requires: [
        'AdmindukWS.view.AksesData.AksesDataPerStatus.ListAksesDataPerStatus',
        'AdmindukWS.view.AksesData.AksesDataPerStatus.ListSummaryAksesDataPerStatus'
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
                            store: cmbStoreInstansiPerStatus,
                            action: 'instansiAksesPerStatus',
                            displayField: 'INSTANSI_NEW',
                            valueField: 'NAMA_INSTANSI',
                            anchor: '30%',
                            editable: false
                        },
                        {
                            xtype: 'panel',
                            name: 'aksesDataPerStatusPanel',
                            title: 'Akses Data Per Status',
                            flex: 3,
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
                            xtype: 'ListAksesDataPerStatus',
                            name: 'gridListAksesDataPerStatus'
                        },
                        {
                            flex: 1,
                            xtype: 'ListSummaryAksesDataPerStatus',
                            name: 'gridListSummaryAksesDataPerStatus'
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


