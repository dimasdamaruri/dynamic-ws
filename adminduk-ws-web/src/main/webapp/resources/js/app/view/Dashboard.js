Ext.define('AdmindukWS.view.Dashboard', {
    extend: 'Ext.container.Container',
    alias: 'widget.dashboard',
    title: 'Dashboard Chart',
    autoScroll: true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    requires: [
        'Ext.chart.*'
    ],
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    autoScroll: true,
                    flex: 2.5,
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                pack: 'end',
                                align: 'middle'
                            },
                            height: 30,
                            width: '100%',
                            items: [
                                {
                                    xtype: 'component',
                                    padding: '5 5 5 15',
                                    html: '<div style="font-size:15px;font-weight: bold;">JUMLAH AKSES LINTAS INSTANSI</div>',
                                    align: 'left',
                                    flex: 1
                                },
                                {   xtype: 'label',
                                    padding: '5 15 5 5',
                                    bold:true,
                                    id: 'labelClock',
                                    html: '<div style="font-size:13px;font-weight: bold;"></div>',
                                    align: 'right'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            name: 'chartContainer',
                            autoScroll: true,
                            flex: 1,
                            layout: {
                                type: 'table',
                                columns: 4
                            },
                            padding: '0 0 0 10',
                            defaults: {
                                height: 100,
                                width: 200
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            name: 'dashboardAksesDataMingguPanel',
                            title: 'Rekap Data 1 Minggu Terakhir',
                            flex: 1,
                            layout: 'fit'
                        },
                        {
                            xtype: 'panel',
                            name: 'dashboardPeringkatAksesPanel',
                            title: 'Rekap Peringkat Akses',
                            flex: 1,
                            layout: 'fit'
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }

});