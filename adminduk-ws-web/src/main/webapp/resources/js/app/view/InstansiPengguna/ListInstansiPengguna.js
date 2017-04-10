Ext.define('AdmindukWS.view.InstansiPengguna.ListInstansiPengguna', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListInstansiPengguna',
    title: 'Instansi Pengguna',
    //split: true,
    autoScroll: true,
//    store: 'InstansiStore',

    requires: [
    ],
    initComponent: function() {
        var me = this;

        var storeMsInstansi = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.Instansi',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GETDATA_LIST_INSTANSI" ,
                reader: {
                    type: 'json',
                    root: 'content',

                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });
        
        Ext.apply(this, {
            store: storeMsInstansi,
            columns: [
                {
                    xtype: 'rownumberer'
                    , width: 40
                },
                {
                    text: 'Nama Instansi',
                    flex: 1,
                    dataIndex: 'NAMA_INSTANSI' ,
                    allowBlank: false
                },
                {
                    text: 'Nama Instansi (Chart)',
                    flex: 1,
                    dataIndex: 'INSTANSI_NEW' ,
                    allowBlank: false
                },
                {
                    text: 'Keterangan',
                    flex: 1,
                    dataIndex: 'KETERANGAN'
                }, 
                {
                    text: 'Status',
                    width: 100,
                    allowBlank: false,
                    dataIndex: 'AKTIF',
                    renderer: function(value, metaData, record, row, col, store, gridView){
                        if(value === "1") {
                            return "AKTIF";
                        } else if(value === "2") { 
                            return "NON AKTIF";
                        } else {
                            return "UNKNOWN";
                        }
                    }

                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: me.store,
                    displayInfo: true,
                    displayMsg: 'Displaying Data {0} - {1} of {2}',
                    emptyMsg: 'No Data to display'
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