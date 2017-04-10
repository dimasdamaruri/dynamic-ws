Ext.define('AdmindukWS.view.MasterUrl.FormMasterUrl',
        {
            extend: 'Ext.form.Panel',
            alias: 'widget.FormMasterUrl',
            title: 'Form WS Server',
            autoScroll: true,
            bodyPadding: 10,
            fieldDefaults: {
                labelWidth: 200
            },
            defaultType: 'textfield',
            initComponent: function() {
                Ext.apply(this, {
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Form Data WS Server',
                            width: '50%',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Server URL',
                                    name: 'KD_URL',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Keterangan',
                                    name: 'KETERANGAN',
                                    allowBlank: false

                                }
                            ]

                        }
                    ],
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

                                }, {
                                    xtype: 'button',
                                    text: 'Cancel',
                                    disabled: false,
                                    action: 'cancel',
                                    iconCls: 'fam-script-delete'

                                }
                            ]
                        }
                    ]

                });
                this.callParent(arguments);
            }
        });
 