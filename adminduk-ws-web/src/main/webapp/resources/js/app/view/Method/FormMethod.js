var comboStoreMethodUrl = Ext.create('AdmindukWS.store.LinkStore');
var comboStoreMethodInstansi = Ext.create('AdmindukWS.store.InstansiStore');
var comboStoreMethodView = Ext.create('AdmindukWS.store.ViewStore');

Ext.define('AdmindukWS.view.Method.FormMethod',
        {
            extend: 'Ext.form.Panel',
            alias: 'widget.FormMethod',
            title: 'Form Metode',
            autoScroll: true,
            bodyPadding: 10,
            fieldDefaults: {
                labelWidth: 200
            },
            defaultType: 'textfield',
            requires: [
                'AdmindukWS.view.Method.GridMethodParam'
                ,'AdmindukWS.view.Method.GridMethodSelectedColumn'
            ],
            initComponent: function() {
                Ext.apply(this, {
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Form Data Metode',
                            items: [
                                {
                                    xtype: 'combo',
                                    width: 500,
                                    fieldLabel: 'IP WS Server',
                                    name: 'KD_URL',
                                    store: comboStoreMethodUrl,
                                    displayField: 'KD_URL',
                                    valueField: 'KD_URL',
                                    allowBlank: false,
                                    labelWidth: 150
                                },
                                {
                                    xtype: 'combo',
                                    width: 500,
                                    fieldLabel: 'Instansi',
                                    name: 'NAMA_INSTANSI',
                                    store: comboStoreMethodInstansi,
                                    displayField: 'NAMA_INSTANSI',
                                    valueField: 'NAMA_INSTANSI',
                                    allowBlank: false,
                                    labelWidth: 150
                                },
                                {
                                    xtype: 'textfield',
                                    width: 500,
                                    fieldLabel: 'Metode',
                                    name: 'NAMA_METODE',
                                    labelWidth: 150,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'combo',
                                    width: 500,
                                    fieldLabel: 'Nama View',
                                    name: 'NAMA_VIEW',
                                    store: comboStoreMethodView,
                                    displayField: 'NAMA_VIEW',
                                    valueField: 'NAMA_VIEW',
                                    allowBlank: false,
                                    labelWidth: 150
                                },
                                {
                                    xtype: 'checkboxfield',
                                    hidden:true,
                                    width: 500,
                                    fieldLabel: 'Data Per Halaman',
                                    name: 'IS_PAGING',
                                    inputValue: '1',
                                    labelWidth: 150
                                },
                                {
                                    xtype: 'textfield',
                                    hidden:true,
                                    width: 500,
                                    fieldLabel: 'Jumlah Data Per Halaman',
                                    name: 'PAGESIZE',
                                    labelWidth: 150
                                },
                                {
                                    xtype: 'checkboxfield',
                                    width: 500,
                                    fieldLabel: 'Data Keluarga',
                                    name: 'IS_KELUARGA',
                                    inputValue: '1',
                                    labelWidth: 150
                                }
                            ]
                        }, {
                            xtype: 'container',
                            flex: 0,
                            border: false,
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                padding: '2'
                            },
                            defaultType: 'textfield',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Data Parameter',
                                    flex: 2,
                                    items: [
                                        {
                                            xtype: 'GridMethodParam',
                                            name: 'listGridMethodParam',
                                            flex: 1
                                        }
                                    ]

                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Kolom yang akan di tampilkan',
                                    flex: 2,
                                    items: [
                                        {
                                            xtype: 'GridMethodSelectedColumn',
                                            name: 'listGridMethodSelectedColumn',
                                            flex: 1
                                        }
                                    ]

                                }
                            ]
                        }],
                        dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Save',
                                            disabled: false,
                                            action: 'save',
                                            iconCls: 'fam-script-save'

                                        }
                                    ]
                                }
                    ]

                });
                this.callParent(arguments);
            }
        });
 