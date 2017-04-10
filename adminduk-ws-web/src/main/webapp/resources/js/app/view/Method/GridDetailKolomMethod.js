Ext.define('AdmindukWS.view.Method.GridDetailKolomMethod', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDetailKolomMethod',
    gridname: 'gridDetailKolomMethod',
    autoScroll: true,

    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            columns: [
                {
                    xtype: 'rownumberer'
                    , width: 40
                },
                {
                    text: 'Kolom',
                    flex:1,
                    dataIndex: 'COLUMN_NAME'
                }
            ]
        });

        this.callParent(arguments);
    }

});
