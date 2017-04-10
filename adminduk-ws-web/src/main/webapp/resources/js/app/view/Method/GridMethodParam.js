Ext.define('AdmindukWS.view.Method.GridMethodParam', {
    extend: 'Ext.grid.Panel',
    xtype: 'cell-editing',
    requires: [
        'Ext.grid.feature.Grouping',
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Ext.ux.CheckColumn'
    ],
    alias: 'widget.GridMethodParam',
    gridname: 'listGridMethodParam',
    id: 'listGridMethodParam',
    height: 250,
    autoScroll: true,
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
        hideGroupedHeader: true,
        startCollapsed: false,
        id: 'gridParam'
    }],
    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            columns: [
                {
                    xtype: 'rownumberer'
                    , width: 40
                },
                {
                    text: 'Parameter',
                    dataIndex: 'COLUMN_NAME',
                    flex: 1
                },
                {
                    xtype: 'checkcolumn',
                    text: 'Select',
                    flex: 1,
                    dataIndex: 'FLAG'
                },
                {
                    xtype: 'checkcolumn',
                    text: 'Like',
                    flex: 1,
                    dataIndex: 'IS_LIKE'
                },
                {
                    text: 'Keterangan',
                    dataIndex: 'KETERANGAN',
                    width: 200,
                    hidden:true,
                    editor: {
                        xtype: 'textfield'

                    }
                }
            ],
            plugins: [{
                ptype: 'cellediting',
                clicksToEdit: 1
            }]
        });

        this.callParent(arguments);
        this.groupingFeature = this.view.getFeature('gridParam');
    }
});