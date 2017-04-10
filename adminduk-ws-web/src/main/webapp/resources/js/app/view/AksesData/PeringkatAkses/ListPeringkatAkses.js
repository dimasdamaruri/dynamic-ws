Ext.define('AdmindukWS.view.AksesData.PeringkatAkses.ListPeringkatAkses', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListPeringkatAkses',
    gridname: 'gridListPeringkatAkses',
    autoScroll: true,

    requires: [
        'AdmindukWS.model.AksesData'
    ],

    initComponent: function () {
        var storePeringkatAkses = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.AksesData',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GET_PERINGKAT_AKSES" ,
                reader: {
                    type: 'json',
                    root: 'content',

                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });

        Ext.apply(this, {
            store: storePeringkatAkses,
            columns: [
                {
                    xtype: 'rownumberer'
                    , width: 40
                },
                {
                    text: 'Instansi',
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
