Ext.define('AdmindukWS.view.Method.DetailListMethod',
        {
            extend: 'Ext.form.Panel',
            alias: 'widget.DetailListMethod',
            autoScroll: true,
            fieldDefaults: {
                labelWidth: 200
            },
            title: 'Detail',
            requires: [
                'AdmindukWS.view.Method.GridDetailParameterMethod',
                'AdmindukWS.view.Method.GridDetailKolomMethod'
            ],
            initComponent: function() {
                Ext.apply(this, {
                    items: [
                        {
                            xtype: 'container',
                            flex: 0,
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                padding: '2'
                            },
                            items: [
                                {
                                    xtype: "textfield",
                                    name: "KD_URL_LIST",
                                    fieldLabel: "URL",
                                    labelWidth: 50,
                                    width: 400
                                }
                            ]
                        },
                        {
                            xtype: 'label',
                            html: '<br>'
                        },
                        {
                            xtype: 'label',
                            text: 'Parameter :'
                        },
                        {
                            xtype: 'GridDetailParameterMethod',
                            name: 'gridDetailParameterMethod',
                            flex: 1
                        } ,
                        {
                            xtype: 'label',
                            html: '<br>'
                        },
                        {
                            xtype: 'label',
                            html: '<br>'
                        },
                        {
                            xtype: 'label',
                            text: 'Daftar Kolom :'
                        },
                        {
                            xtype: 'GridDetailKolomMethod',
                            name: 'gridDetailKolomMethod',
                            flex: 1
                        }
                    ]
                });
                this.callParent(arguments);
            }
        });
 