Ext.define('AdmindukWS.view.AksesData.AksesDataPerStatus.ListSummaryAksesDataPerStatus', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListSummaryAksesDataPerStatus',
    gridname: 'gridListSummaryAksesDataPerStatus',
    autoScroll: true,
    
    requires: [
        'AdmindukWS.model.SummaryAksesData'
    ],

    initComponent: function () {
        var storeSummaryAksesDataPerStatus = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.SummaryAksesData',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GET_PER_STATUS_TOTAL" ,
                reader: {
                    type: 'json',
                    root: 'content',

                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });

        Ext.apply(this, {
            store: storeSummaryAksesDataPerStatus,
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
