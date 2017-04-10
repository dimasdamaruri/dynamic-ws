Ext.define('AdmindukWS.view.AksesData.AksesDataPerStatus.ListAksesDataPerStatus', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListAksesDataPerStatus',
    gridname: 'gridListAksesDataPerStatus',
    autoScroll: true,

    requires: [
        'AdmindukWS.model.AksesData'
    ],

    initComponent: function () {
        var storeAksesDataPerStatus = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.AksesData',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GET_PER_STATUS" ,
                reader: {
                    type: 'json',
                    root: 'content',

                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });
        
        Ext.apply(this, {
            store: storeAksesDataPerStatus,
            columns: [
                {
                    xtype: 'rownumberer'
                    , width: 40
                },
                {
                    text: 'Status',
                    flex: 1,
                    dataIndex: 'NAMA_DATA'
                }, {
                    text: 'Jumlah Akses',
                    renderer: Ext.util.Format.numberRenderer('0,0'),
                    flex: 1,
                    dataIndex: 'JUMLAH_DATA'
                }
            ]
        });

        this.callParent(arguments);
    }

});
