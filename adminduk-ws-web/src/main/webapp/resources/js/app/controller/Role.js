Ext.define('AdmindukWS.controller.Role', {
    extend: 'Ext.app.Controller',

    views: [ 'role.List', 'role.Edit'  ],
    allowWrite: AdmindukWS.util.SecurityHelper.isWriteAllowed("ROLE_WRITE"),
    models: [ 'Role'],
    stores: [ 'Roles'],

    refs: [
        {
            ref: 'roleList',
            selector: 'roleList'
        },
        {
            ref: 'roleEditForm',
            selector: 'roleEdit > form'
        },
        {
            ref: 'roleEditWindow',
            selector: 'roleEdit'
        },
        {
            ref: 'roleDeleteButton',
            selector: 'roleList button[action=delete]'
        }  ,
        {
            ref: 'roleAddButton',
            selector: 'roleList button[action=add]'
        }  ,
        {
            ref: 'rolePagingToolbar',
            selector: 'roleList pagingtoolbar'
        }
    ],

    init: function () {
        this.control({
            'roleList': {
                itemdblclick: this.editRole
            }
        });
        if (this.allowWrite) {
            this.control({
                'roleList': {
                    itemclick: this.enableButton,
                    selectionchange: this.roleListSelectionChange
                },
                'roleEdit button[action=save]': {
                    click: this.updateRole
                },
                'roleList button[action=add]': {
                    click: this.createRole
                },
                'roleList button[action=delete]': {
                    click: this.deleteRole
                }
            });
        } else {
            this.control({
                'roleList': {
                    show: function (self) {
                        self.down("button[action=add]").setDisabled(true);
                        self.down("button[action=delete]").setDisabled(true);
                    }
                },
                'roleEdit': {
                    show: function (self) {
                        self.down("button[action=save]").setDisabled(true);
                    }
                }
            });
        }
    },

    roleListSelectionChange: function (sel, selected) {
        if (selected[0]) {
            this._toggleDeleteButton(true);
        } else {
            this._toggleDeleteButton(false);
        }
    },
    enableButton: function (button, record) {
        this._toggleDeleteButton(true);
    },

    editRole: function (grid, record) {
        var view = Ext.widget('roleEdit');
        view.down('form').loadRecord(record);
    },

    createRole: function () {
        Ext.widget('roleEdit', {
            title: "Tambah Role"
        });
    },
    deleteRole: function (button) {
        var record = this.getRoleList().getSelectionModel().getSelection()[0];
        var self = this;
        if (record) {
            Ext.Ajax.request({
                url: AdmindukWS.config.roleUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    if (response.responseText.indexOf("Silahkan mengisi username") > 0) {
                        window.location = "loginpage";
                    } else {
                    AdmindukWS.util.MessageBox.showMessageBoxDelete(response, options, 'Role');
                    self._doGridRefresh();
                    }
                },
                failure: function (fp, o) {
                    console.info('failure o', o);
                    AdmindukWSErrorUtil.failureHandler(fp, o);
                }
            });
        }

    },
    updateRole: function (button) {
        var self = this;
        var form = this.getRoleEditForm();
        var values = form.getValues();

        if (form.getForm().isValid()) {
            Ext.Ajax.request({
                url: AdmindukWS.config.roleUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode(values),
                success: function (response, options) {
                    if (response.responseText.indexOf("Silahkan mengisi username") > 0) {
                        window.location = "loginpage";
                    } else {
                    AdmindukWS.util.MessageBox.showMessageBoxPostPut(response, options, 'Role');
                    self._doGridRefresh();
                    }
                },
                failure: function (fp, o) {
                    console.info('failure o', o);
                    AdmindukWSErrorUtil.failureHandler(fp, o);
                }
            });

            this.getRoleEditWindow().close();
        }
    },

    _toggleDeleteButton: function (enable) {
        var button = this.getRoleDeleteButton();
        if (enable) {
            button.enable();
        } else {
            button.disable();
        }
    },

    _doGridRefresh: function () {
        this.getRoleList().down('pagingtoolbar').doRefresh();
    }
});