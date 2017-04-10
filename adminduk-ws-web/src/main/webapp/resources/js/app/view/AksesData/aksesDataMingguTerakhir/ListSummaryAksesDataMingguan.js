Ext.define('AdmindukWS.view.AksesData.aksesDataMingguTerakhir.ListSummaryAksesDataMingguan', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListSummaryAksesDataMingguan',
    gridname: 'gridListSummaryAksesDataMingguan',
    autoScroll: true,

    requires: [
        'AdmindukWS.model.SummaryAksesData'
    ],

    initComponent: function () {
        var storeSummaryAksesData = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.SummaryAksesData',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GET_MINGGU_TERAKHIR_TOTAL" ,
                reader: {
                    type: 'json',
                    root: 'content',

                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });

        Ext.apply(this, {
            store: storeSummaryAksesData,
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
                    flex: 1,
                    renderer: Ext.util.Format.numberRenderer('0,0'),
                    dataIndex: 'JUMLAH'
                }
            ]
        });

        this.callParent(arguments);
    }

});
