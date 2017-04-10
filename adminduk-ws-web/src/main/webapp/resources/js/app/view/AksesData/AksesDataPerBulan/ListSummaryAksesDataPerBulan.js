Ext.define('AdmindukWS.view.AksesData.AksesDataPerBulan.ListSummaryAksesDataPerBulan', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListSummaryAksesDataPerBulan',
    gridname: 'gridListSummaryAksesDataPerBulan',
    autoScroll: true,

    requires: [
        'AdmindukWS.model.SummaryAksesData'
    ],

    initComponent: function () {
        var storeSummaryAksesDataPerBulan = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.SummaryAksesData',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GET_PER_BULAN_TOTAL" ,
                reader: {
                    type: 'json',
                    root: 'content',

                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });
        
        Ext.apply(this, {
            store: storeSummaryAksesDataPerBulan,
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
