var comboStoreUserInstansi = Ext.create('AdmindukWS.store.InstansiStore');

var storeMSPropinsi = Ext.create('AdmindukWS.store.PropinsiStore');

var jenisCombo = Ext.create('Ext.data.Store', {
    fields: ['id_aktif', 'status_aktif'],
    data: [
        {"id_aktif": "1", "status_aktif": "Aktif"},
        {"id_aktif": "2", "status_aktif": "Non Aktif"}
    ]
});

Ext.define('AdmindukWS.view.MasterUser.FormUser',
        {
            extend: 'Ext.form.Panel',
            alias: 'widget.FormUser',
            title: 'Form User',
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
                            title: 'Form Data User',
                            width: '50%',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'User ID',
                                    name: 'USER_ID',
                                    allowBlank: false

                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama User',
                                    name: 'USERNAME',
                                    allowBlank: false

                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'NIK',
                                    name: 'NIK',
                                    size: '16',
                                    maxLength : 16,
                                    enforceMaxLength: 16,
                                    allowBlank : false
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'NIP',
                                    name: 'NOPEG'

                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Jabatan',
                                    name: 'OCUPATION'

                                },
//                                {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'IP Instansi Asal',
//                                    name: 'IP_ADDRES',
//                                    allowBlank: false
//                                },
                                {
                                    xtype: 'textfield',
                                    inputType: 'password',
                                    fieldLabel: 'Password',
                                    name: 'PASSWORD'
                                },
                                {
                                    xtype: 'textfield',
                                    inputType: 'password',
                                    fieldLabel: 'Retype Password',
                                    name: 'RETYPE_PASSWORD'
                                },
                                {
                                    xtype: 'combo',
                                    width: 400,
                                    fieldLabel: 'Instansi',
                                    name: 'NAMA_INSTANSI',
                                    store: comboStoreUserInstansi,
                                    displayField: 'NAMA_INSTANSI',
                                    valueField: 'NAMA_INSTANSI',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Propinsi',
                                    id:'getIDComboProp',
                                    store : storeMSPropinsi,
                                    displayField: 'NAMA_PROP',
                                    valueField: 'NO_PROP',
                                    name: 'NAMA_PROP',
                                    editable:false ,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Kabupaten',
                                    id:'getIDComboKab',
                                    store: Ext.create('Ext.data.Store', {
                                        model: 'AdmindukWS.model.Propinsi',
                                        proxy: {
                                            type: 'ajax',
                                            pageParam: 'page.page',
                                            url: AdmindukWS.config.servicePath + "/kode=GET_LIST_KAB",
                                            reader: {
                                                type: 'json',
                                                root: 'content',
                                                totalProperty: 'totalElements'
                                            }
                                        },
                                        autoLoad: true
                                    }),
                                    displayField: 'KAB_NAME',
                                    valueField: 'NO_KAB',
                                    name: 'KAB_NAME',
                                    editable:false ,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Keterangan',
                                    name: 'KETERANGAN'

                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Quota',
                                    name: 'KUOTA',
                                    allowBlank: false,
                                    minValue: 0
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    store : jenisCombo,
                                    displayField: 'status_aktif',
                                    valueField: 'id_aktif',
                                    name: 'AKTIF',
                                    editable:false ,
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
                                    action: 'saveUser',
                                    iconCls: 'fam-script-save'

                                },         {
                                    xtype: 'button',
                                    text: 'Cancel',
                                    disabled: false,
                                    action: 'cancelUser',
                                    iconCls: 'fam-script-delete'

                                }
                            ]
                        }
                    ]

                });
                this.callParent(arguments);
            }
        });
 