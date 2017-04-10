Ext.define('AdmindukWS.view.Instansi.ListInstansi', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListInstansi',
    gridname: 'gridListInstansi',
    autoScroll: true,
//    store: 'InstansiStore',
    title: 'List',
    data: null,

    
    initComponent: function () {
//        var me = this;

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
                    dataIndex: 'NAMA_INSTANSI'
                }, {
                    text: 'Alamat',
                    flex: 1,
                    dataIndex: 'ALAMAT'
                }, {
                    text: 'No Telp',
                    flex: 1,
                    dataIndex: 'NO_TELP'
                }, {
                    text: 'Email',
                    flex: 1,
                    dataIndex: 'EMAIL'
                }, {
                    text: 'PIC Instansi',
                    flex: 1,
                    dataIndex: 'PIC_NAMA'
                }, {
                    text: 'PIC Telp',
                    flex: 1,
                    dataIndex: 'PIC_TELP'
                }, {
                    text: 'IP Address',
                    flex: 1,
                    dataIndex: 'IP_ADDRESS'
                }, {
                    text: 'Nama Instansi (Chart)',
                    flex: 1,
                    dataIndex: 'INSTANSI_NEW' ,
                    allowBlank: false
                }, {
                    text: 'Keterangan',
                    flex: 1,
                    dataIndex: 'KETERANGAN'
                } , {
                    text: 'Status',
                    flex: 1,
                    dataIndex: 'AKTIF',
                    renderer: function(value) {
                        if (value == '1') {
                            return 'AKTIF';
                        } else if (value == '2') {
                            return 'NON AKTIF';
                        } else {
                            return '-';
                        }
                    }
                }
            ],
            tbar: [
                {
                    itemId: 'addState',
                    action : 'newInstansi',
                    text: 'Tambah Instansi',
                    iconCls: 'fam-add'
                },
                {
                    itemId: 'editState',
                    action : 'editInstansi',
                    iconCls:'fam-page-edit',
                    text: 'Edit',
                    disabled: true
                },                {
                    itemId: 'deleteState',
                    action : 'deleteInstansi',
                    iconCls:'fam-page-delete',
                    text: 'Delete',
                    disabled: true
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: storeMsInstansi,
                    displayInfo: true,
                    displayMsg: 'Displaying Data {0} - {1} of {2}',
                    emptyMsg: 'No Data to display'
                }
            ]
        });

        this.callParent(arguments);
    }

});
