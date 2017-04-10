Ext.define('AdmindukWS.view.user.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.userEdit',

    title: 'Edit User',
    layout: 'fit',
    autoShow: true,
    resizable: false,
    modal: true,
    passwordRequired: false,
    initComponent: function () {
        var self = this;
        Ext.apply(Ext.form.field.VTypes, {
            password: function (val, field) {
                if (field.initialPassField) {
                    var pwd = field.up('form').down('#' + field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },
            passwordText: 'Passwords do not match'
        });

        self.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                defaults: {
                    width: 600
                },
                items: [
                    {
                        xtype: 'fieldset',
                        columnWidth: 0.5,
                        title: 'Detail',
                        defaults: {anchor: '100%'},
                        layout: 'anchor',
                        items: [
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                fieldLabel: 'NIP',
                                name: 'nip'
                            } ,
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                fieldLabel: 'Nama',
                                name: 'nama'
                            } ,
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                fieldLabel: 'Username',
                                name: 'username',
                                allowBlank: false
                            } ,
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                fieldLabel: 'Email',
                                name: 'email',
                                vtype: 'email'
                            } ,
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                fieldLabel: 'Telphone',
                                name: 'telphone'
                            } ,
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                fieldLabel: 'Handphone',
                                name: 'handphone'
                            },
                            {
                                xtype: 'checkboxfield',
                                hideEmptyLabel: false,
                                anchor: '100%',
                                boxLabel: 'Enabled',
                                name: 'enabled',
                                inputValue: true,
                                uncheckedValue: false
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        columnWidth: 0.5,
                        title: 'Password',
                        collapsible: true,
                        collapsed: !self.passwordRequired,
                        defaults: {anchor: '100%'},
                        layout: 'anchor',
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Password',
                                name: 'pass',
                                itemId: 'pass',
                                inputType: 'password',
                                allowBlank: !self.passwordRequired
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Confirm Password',
                                name: 'passConfirm',
                                vtype: 'password',
                                initialPassField: 'pass',
                                inputType: 'password',
                                allowBlank: !self.passwordRequired
                            } ,
                            {
                                xtype: 'displayfield',
                                hideEmptyLabel: false,
                                value: 'Biarkan kosong apabila tidak ingin mengubah',
                                hidden: self.passwordRequired
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        columnWidth: 0.5,
                        title: 'Groups',
                        defaults: {anchor: '100%'},
                        layout: 'anchor',
                        items: [
                            {
                                xtype: 'checkboxgroup',
                                columns: 3,
                                vertical: true,
                                items: function () {
                                    var groups = Ext.data.StoreManager.lookup('Groups').data.items;
                                    var result = [];
                                    Ext.each(groups, function (group) {
                                        Ext.Array.push(result, {
                                            boxLabel: group.get('nama'),
                                            name: 'groups',
                                            inputValue: group.get('id')
                                        });
                                    });
                                    return result;
                                }()
                            }
                        ]
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});