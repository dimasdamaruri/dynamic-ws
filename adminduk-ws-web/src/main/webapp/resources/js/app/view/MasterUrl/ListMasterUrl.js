Ext.define('AdmindukWS.view.MasterUrl.ListMasterUrl', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListMasterUrl',
    gridname: 'gridListMasterUrl',
    autoScroll: true,
    title: 'List',

    requires: [
        'AdmindukWS.model.MasterUrl'
    ],

    initComponent: function () {
        var storeMsUrl = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.MasterUrl',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GETDATA_LIST_URL" ,
                reader: {
                    type: 'json',
                    root: 'content',

                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });

        Ext.apply(this, {
            store: storeMsUrl,
            columns: [
                {
                    xtype: 'rownumberer'
                    , width: 40
                },
                {
                    text: 'Server URL',
                    flex: 1,
                    dataIndex: 'KD_URL'
                }, {
                    text: 'Keterangan',
                    flex: 1,
                    dataIndex: 'KETERANGAN'
                }
            ],
            tbar: [
                {
                    itemId: 'addState',
                    action : 'newUrl',
                    text: 'Tambah WS Server',
                    iconCls: 'fam-add'
                },
                {
                    itemId: 'deleteState',
                    action : 'deleteUrl',
                    iconCls:'fam-page-delete',
                    text: 'Delete',
                    disabled: true
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: storeMsUrl,
                    displayInfo: true,
                    displayMsg: 'Displaying Data {0} - {1} of {2}',
                    emptyMsg: 'No Data to display'
                }
            ]
        });

        this.callParent(arguments);
    }

});
