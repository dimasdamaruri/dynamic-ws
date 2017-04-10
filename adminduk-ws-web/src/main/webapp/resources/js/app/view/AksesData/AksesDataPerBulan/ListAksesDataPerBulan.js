Ext.define('AdmindukWS.view.AksesData.AksesDataPerBulan.ListAksesDataPerBulan', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListAksesDataPerBulan',
    gridname: 'gridListAksesDataPerBulan',
    autoScroll: true,

    requires: [
        'AdmindukWS.model.AksesData'
    ],

    initComponent: function () {
        var storeAksesDataPerBulan = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.AksesData',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GET_PER_BULAN" ,
                reader: {
                    type: 'json',
                    root: 'content',

                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });

        Ext.apply(this, {
            store: storeAksesDataPerBulan,
            columns: [
                {
                    xtype: 'rownumberer'
                    , width: 40
                },
                {
                    text: 'Bulan',
                    flex: 1,
                    dataIndex: 'NAMA_DATA'
                }, {
                    text: 'JUMLAH_DATA',
                    renderer: Ext.util.Format.numberRenderer('0,0'),
                    flex: 1,
                    dataIndex: 'JUMLAH_DATA'
                }
            ]
        });

        this.callParent(arguments);
    }

});
