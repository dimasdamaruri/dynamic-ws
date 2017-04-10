Ext.define('AdmindukWS.view.Header', {
    extend: 'Ext.Container',
    alias: 'widget.appHeader',
    xtype: 'appHeader',
    id: 'app-header',
    height: 60,
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    requires: [
        'Ext.menu.*'
    ],
    initComponent: function() {
        this.items = [
            {
                xtype: 'panel',
                frame: true,
                margin: '3 3 3 3',
                region: 'west',
//                width: 60,
                html: '<div align="left" ><img style="height: 40px; width: 40px" src="' + AdmindukWS.config.resourcesPath + 'img/logo.png" / > ' +
                    '</div>'
            },
            {
                xtype: 'component',
                id: 'app-header-title',
                html: 'Dashboard Web Service',
                flex: 1
            }
        ];

        this.items.push(
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'component',
                            padding: '2 5 0 0',
                            html: '<div style="font-size:13px;">Direktorat Jendral Kependudukan dan Pencatatan Sipil</div>',
                            align: 'right'
                        },
                        {
                            xtype: 'headerMenu',
                            padding: '5 5 0 0'
                        }
                    ]
                }
        );
        this.callParent();
    }
});
