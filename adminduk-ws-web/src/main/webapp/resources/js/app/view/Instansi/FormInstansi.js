var jenisCombo = Ext.create('Ext.data.Store', {
    fields: ['id_aktif', 'status_aktif'],
    data: [
        {"id_aktif": "1", "status_aktif": "Aktif"},
        {"id_aktif": "2", "status_aktif": "Non Aktif"}
    ]
});

var telp = /^([0-9]{1,13})/;
Ext.apply(Ext.form.field.VTypes, {
    //  vtype validation function
    checkTelp: function (val, field) {
        return telp.test(val);
    },
    radiusText: 'Not a Valid Radius.'
});

Ext.define('AdmindukWS.view.Instansi.FormInstansi',
        {
            extend: 'Ext.form.Panel',
            alias: 'widget.FormInstansi',
            title: 'Form Instansi',
            autoScroll: true,
            bodyPadding: 10,
            fieldDefaults: {
                labelWidth: 200
            },
            defaultType: 'textfield',
            initComponent: function () {
                Ext.apply(this, {
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Form Data Instansi',
                            width: '50%',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Instansi',
                                    name: 'NAMA_INSTANSI',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Instansi (Chart)',
                                    name: 'INSTANSI_NEW',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Keterangan Instansi',
                                    name: 'KETERANGAN',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'IP Address Server',
                                    name: 'IP_ADDRESS',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Alamat Instansi',
                                    name: 'ALAMAT',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'No Telp Instansi',
                                    name: 'NO_TELP',
                                    enforceMaxLength: 13,
                                    maxLength : 13,
                                    vtype: 'checkTelp',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Email Instansi',
                                    name: 'EMAIL',
                                    vtype: 'email',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'PIC',
                                    name: 'PIC_NAMA',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'No. Telp PIC',
                                    name: 'PIC_TELP',
                                    enforceMaxLength: 13,
                                    maxLength : 13,
                                    vtype: 'checkTelp',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    store: jenisCombo,
                                    displayField: 'status_aktif',
                                    valueField: 'id_aktif',
                                    name: 'AKTIF',
                                    editable: false,
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
 