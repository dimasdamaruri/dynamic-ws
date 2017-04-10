Ext.define('AdmindukWS.view.Method.GridMethodSelectedColumn', {
    extend: 'Ext.grid.Panel',
    xtype: 'cell-editing',
    requires: [
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.dd.*'
    ],
    alias: 'widget.GridMethodSelectedColumn',
    gridname: 'listGridMethodSelectedColumn',
    height: 250,
    id: 'listGridMethodSelectedColumn',
    autoScroll: true,
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
        hideGroupedHeader: true,
        startCollapsed: false,
        id: 'gridSelectedColumn'
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
                }
            ],
            plugins: [{
                ptype: 'cellediting',
                clicksToEdit: 1
            }]
        });

        this.callParent(arguments);
        this.groupingFeature = this.view.getFeature('terminSelectedColumn');
    }
});