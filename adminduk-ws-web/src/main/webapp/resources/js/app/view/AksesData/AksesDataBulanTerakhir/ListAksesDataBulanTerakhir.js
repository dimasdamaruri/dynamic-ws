Ext.define('AdmindukWS.view.AksesData.AksesDataBulanTerakhir.ListAksesDataBulanTerakhir', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListAksesDataBulanTerakhir',
    gridname: 'gridListAksesDataBulanTerakhir',
    autoScroll: true,
    
    requires: [
        'AdmindukWS.model.AksesData'
    ],

    initComponent: function () {

        var storeAksesDataBulanTerakhir = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.AksesData',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GET_BULAN_TERAKHIR" ,
                reader: {
                    type: 'json',
                    root: 'content',

                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });

        Ext.apply(this, {
            store: storeAksesDataBulanTerakhir,
            columns: [
                {
                    xtype: 'rownumberer'
                    , width: 40
                },
                {
                    text: 'Tanggal',
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
