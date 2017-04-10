Ext.define('AdmindukWS.view.AksesData.aksesDataMingguTerakhir.ListAksesDataMingguan', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListAksesDataMingguan',
    gridname: 'gridListAksesDataMingguan',
    autoScroll: true,
    
    requires: [
        'AdmindukWS.model.AksesData'
    ],

    initComponent: function () {

        var storeAksesData = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.AksesData',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GET_MINGGU_TERAKHIR" ,
                reader: {
                    type: 'json',
                    root: 'content',

                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });
        
        Ext.apply(this, {
            store: storeAksesData,
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
