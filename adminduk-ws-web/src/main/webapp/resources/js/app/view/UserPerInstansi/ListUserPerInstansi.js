Ext.define('AdmindukWS.view.UserPerInstansi.ListUserPerInstansi', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListUserPerInstansi',
    gridname: 'gridListUserPerInstansi',
    autoScroll: true,

    requires: [
        'AdmindukWS.model.AksesData'
    ],

    initComponent: function () {
        var storeUserPerInstansi = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.AksesData',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GET_USER_INSTANSI" ,
                reader: {
                    type: 'json',
                    root: 'content',

                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });

        Ext.apply(this, {
            store: storeUserPerInstansi,
            columns: [
                {
                    xtype: 'rownumberer'
                    , width: 40
                },
                {
                    text: 'Nama Instansi',
                    flex: 1,
                    dataIndex: 'NAMA_DATA'
                }, {
                    text: 'Jumlah User',
                    renderer: Ext.util.Format.numberRenderer('0,0'),
                    flex: 1,
                    dataIndex: 'JUMLAH_DATA'
                }
            ]
        });

        this.callParent(arguments);
    }

});
