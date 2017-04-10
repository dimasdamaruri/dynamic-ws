Ext.define('AdmindukWS.view.GridDashboard', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDashboard',
    gridname: 'gridDashboard',
    title: 'Dashboard Data',
    autoScroll: true,
    store: 'GridDashboardStore',

    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            columns: [
                {
                    text: 'NAMA USER',
                    flex: 1,
                    dataIndex: 'USERNAME'
                }, {
                    text: 'INSTANSI',
                    flex: 1,
                    dataIndex: 'INSTANSI'
                }, {
                    text: 'PENCARIAN',
//                    flex: 1,
                    width: 125,
                    dataIndex: 'PENCARIAN'
                }, {
                    text: 'STATUS',
//                    flex: 1,
                    width: 125,
                    dataIndex: 'STATUS'
                }, {
                    text: 'TANGGAL',
//                    flex: 1,
                    dataIndex: 'TANGGAL',
                    width: 75
                }, {
                    text: 'JAM',
//                    flex: 1,
                    dataIndex: 'JAM',
                    width: 75
                },{
                    text: 'IP ADDRESS SERVER',
//                    flex: 1,
                    width: 125,
                    dataIndex: 'IP_ADDRES'
                },{
                    text: 'IP ADDRESS CLIENT',
//                    flex: 1,
                    width: 125,
                    dataIndex: 'IP_USER'
                },{
                    text: 'WILAYAH',
//                    flex: 1,
                    width: 250,
                    dataIndex: 'WILAYAH'
                }
            ]
        });

        this.callParent(arguments);
    }

});
