Ext.define('AdmindukWS.view.Laporan.ListAksesDataTahunan', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListAksesDataTahunan',
    gridname: 'gridListAksesDataTahunan',
    store: 'LaporanDataTahunanStore',
    autoScroll: true,
    title:'Laporan Tahunan',

    requires: [
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.dd.*'
    ],

    features: [{
        ftype: 'groupingsummary',
        groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
        hideGroupedHeader: true,
        startCollapsed: false,
        id: 'group'
    }],

    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            
            columns: [
                {
                    text: 'Nama Instansi',
                    flex: 1,
                    dataIndex: 'NAMA_DATA',
                    summaryType: 'count',
                    summaryRenderer: function(value, summaryData, dataIndex) {
                        return ((value === 0 || value > 1) ? '(' + value + ' Instansi)' : '1 Instansi');
                    }
                }, {
                    text: 'Jumlah',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'JUMLAH_DATA',
                    renderer: function(value, metaData, record, row, col, store, gridView){
                        return Ext.util.Format.number(value, '0,000');
                    },
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex) {
                        return Ext.util.Format.number(value, '0,000');
                    }
                }
            ],
            tbar: [
//               {
//                   xtype: 'button',
//                   itemId: 'grid-excel-button',
//                   iconCls: 'fam-page-excel',
//                   text: 'Export to Excel',
//                   handler: function(b, e) {
//                       b.up('grid').downloadExcelXml();
//                   }
//               },
               {
                    itemId: 'exportButton',
                    action : 'exportExcel',
                    text: 'Export to Excel',
                    iconCls: 'fam-page-excel'
               }
            ]
        });

        this.callParent(arguments);
        this.groupingFeature = this.view.getFeature('group');
    }

});