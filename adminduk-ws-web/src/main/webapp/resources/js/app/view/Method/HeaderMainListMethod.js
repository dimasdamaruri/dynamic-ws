Ext.define('AdmindukWS.view.Method.HeaderMainListMethod',
        {
            extend: 'Ext.form.Panel',
            alias: 'widget.HeaderMainListMethod',
            title: 'List',
            layout:'border',
            defaults: {
                collapsible: true,
                split: true
            },
            autoScroll: true,
            fieldDefaults: {
                labelWidth: 200
            },
            defaultType: 'textfield',
            requires: [
                'AdmindukWS.view.Method.ListMethod'
                , 'AdmindukWS.view.Method.DetailListMethod'
            ],
            initComponent: function() {
                Ext.apply(this, {
                    items: [
                        {
                            region: 'center',
                            collapsible: false,
                            xtype: 'ListMethod',
                            name: 'gridListMethod',
                            flex: 2
                        },
                        {
                            region:'east',
                            flex: 1,
                            xtype: 'DetailListMethod',
                            name: 'detailListMethod'
                        }
                    ]
                });
                this.callParent(arguments);
            }
        });
 