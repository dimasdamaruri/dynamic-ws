Ext.define('AdmindukWS.view.Method.ListMethod', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListMethod',
    gridname: 'gridListMethod',
    autoScroll: true,

    requires: [
        'AdmindukWS.model.Method'
    ],

    initComponent: function () {

        var storeMsMethod = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.Method',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GETDATA_LIST_METODE" ,
                reader: {
                    type: 'json',
                    root: 'content',

                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });

        Ext.apply(this, {
            store: storeMsMethod,
            columns: [
                {
                    xtype: 'rownumberer'
                    , width: 40
                },
                {
                    text: 'WS Server',
                    flex: 1,
                    dataIndex: 'KD_URL'
                }, {
                    text: 'Nama Instansi',
                    flex: 1,
                    dataIndex: 'NAMA_INSTANSI'
                }, {
                    text: 'Metode',
                    flex: 1,
                    dataIndex: 'NAMA_METODE'
                }, {
                    text: 'Halaman',
                    flex: 1,
                    dataIndex: 'IS_PAGING'
                }, {
                    text: 'Data Keluarga',
                    flex: 1,
                    dataIndex: 'IS_KELUARGA'
                }
            ],
            tbar: [
                {
                    itemId: 'addState',
                    action : 'newMethod',
                    text: 'Tambah Metode',
                    iconCls: 'fam-add'
                },
                {
                    itemId: 'addDelete',
                    action : 'deleteMethod',
                    text: 'Delete Metode',
                    iconCls: 'fam-delete'
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: storeMsMethod,
                    displayInfo: true,
                    displayMsg: 'Displaying Data {0} - {1} of {2}',
                    emptyMsg: 'No Data to display'
                }
            ]
        });

        this.callParent(arguments);
    }

});
