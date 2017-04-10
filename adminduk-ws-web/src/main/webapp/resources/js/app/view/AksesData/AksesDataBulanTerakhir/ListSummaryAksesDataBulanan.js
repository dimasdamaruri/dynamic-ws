Ext.define('AdmindukWS.view.AksesData.AksesDataBulanTerakhir.ListSummaryAksesDataBulanan', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListSummaryAksesDataBulanan',
    gridname: 'gridListSummaryAksesDataBulanan',
    autoScroll: true,
    
    requires: [
        'AdmindukWS.model.SummaryAksesData'
    ],

    initComponent: function () {

        var storeSummaryAksesDataBulanan = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.SummaryAksesData',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GET_BULAN_TERAKHIR_TOTAL" ,
                reader: {
                    type: 'json',
                    root: 'content',

                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });

        Ext.apply(this, {
            store: storeSummaryAksesDataBulanan,
            columns: [
                {
                    xtype: 'rownumberer'
                    , width: 40
                },
                {
                    text: 'Title',
                    flex: 1,
                    dataIndex: 'TITLE'
                }, {
                    text: 'Jumlah',
                    renderer: Ext.util.Format.numberRenderer('0,0'),
                    flex: 1,
                    dataIndex: 'JUMLAH'
                }
            ]
        });

        this.callParent(arguments);
    }

});
