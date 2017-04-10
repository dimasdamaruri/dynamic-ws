Ext.define('AdmindukWS.view.Method.GridDetailParameterMethod', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDetailParameterMethod',
    gridname: 'gridDetailParameterMethod',
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
                    text: 'Parameter',
                    width: 75,
                    dataIndex: 'COLUMN_NAME'
                }, {
                    text: 'Type',
                    width: 75,
                    dataIndex: 'TIPE_DATA'
                }, {
                    text: 'Like',
                    width: 75,
                    dataIndex: 'IS_LIKE_VIEW'
                },{
                    text: 'Keterangan',
                    flex: 1,
                    dataIndex: 'KETERANGAN'
                }
            ]
        });

        this.callParent(arguments);
    }

});
