Ext.define('AdmindukWS.view.MasterParameter.ListMasterParameter', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListMasterParameter',
    gridname: 'gridListMasterParameter',
    autoScroll: true,
    title: 'List',
    
    requires: [
        'AdmindukWS.model.Parameter'
    ],
    
    initComponent: function () {
        var storeMsParameter = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.Parameter',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GETDATA_LIST_PARAMETER" ,
                reader: {
                    type: 'json',
                    root: 'content',

                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });

        Ext.apply(this, {
            store: storeMsParameter,
            columns: [
                {
                    xtype: 'rownumberer'
                    , width: 40
                },
                {
                    text: 'Kode Parameter',
                    flex: 1,
                    dataIndex: 'COLUMN_NAME'
                }, {
                    text: 'Keterangan',
                    flex: 1,
                    dataIndex: 'KETERANGAN'
                }
            ],
            tbar: [
                {
                    itemId: 'addState',
                    action : 'newParameter',
                    text: 'Tambah Parameter',
                    iconCls: 'fam-add'
                },
                {
                    itemId: 'deleteState',
                    action : 'deleteParameter',
                    iconCls:'fam-page-delete',
                    text: 'Delete',
                    disabled: true
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: storeMsParameter,
                    displayInfo: true,
                    displayMsg: 'Displaying Data {0} - {1} of {2}',
                    emptyMsg: 'No Data to display'
                }
            ]
        });

        this.callParent(arguments);
    }

});
