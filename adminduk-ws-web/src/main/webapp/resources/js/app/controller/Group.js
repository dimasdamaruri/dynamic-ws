Ext.define('AdmindukWS.controller.Group', {
    extend: 'Ext.app.Controller',
    views: [ 'group.List', 'group.Edit' ],
    allowWrite: AdmindukWS.util.SecurityHelper.isWriteAllowed("GROUP_WRITE"),
    models: [ 'Group'],
    stores: [ 'Groups'],
    refs: [
        {
            ref: 'groupList',
            selector: 'groupList'
        },
        {
            ref: 'groupEditForm',
            selector: 'groupEdit > form'
        },
        {
            ref: 'groupRolesCheckbox',
            selector: 'groupEdit   checkboxgroup'
        },
        {
            ref: 'groupEditWindow',
            selector: 'groupEdit'
        },
        {
            ref: 'groupDeleteButton',
            selector: 'groupList button[action=delete]'
        }  ,
        {
            ref: 'groupPagingToolbar',
            selector: 'groupList pagingtoolbar'
        }
    ],

    init: function () {
        this.control({
            'groupList': {
                itemdblclick: this.editGroup
            }
        });
        if (this.allowWrite) {
            this.control({
                'groupList': {
                    itemclick: this.enableButton,
                    selectionchange: this.groupListSelectionChange
                },
                'groupEdit button[action=save]': {
                    click: this.updateGroup
                },
                'groupList button[action=add]': {
                    click: this.createGroup
                },
                'groupList button[action=delete]': {
                    click: this.deleteGroup
                }
            });
        } else {
            this.control({
                'groupList': {
                    show: function (self) {
                        self.down("button[action=add]").setDisabled(true);
                        self.down("button[action=delete]").setDisabled(true);
                    }
                },
                'groupEdit': {
                    show: function (self) {
                        self.down("button[action=save]").setDisabled(true);
                    }
                }
            });
        }
    },

    groupListSelectionChange: function (sel, selected) {
        if (selected[0]) {
            this._toggleDeleteButton(true);
        } else {
            this._toggleDeleteButton(false);
        }
    },
    enableButton: function (button, record) {
        this._toggleDeleteButton(true);
    },

    editGroup: function (grid, record) {
        var view = Ext.widget('groupEdit');
        view.down('form').loadRecord(record);
        this._updateFormRecord(record.data.roles);
    },

    _updateFormRecord: function (roles) {
        var rolesCheckbox = this.getGroupRolesCheckbox();
        Ext.each(roles, function (role) {
            rolesCheckbox.down('[inputValue=' + role.authority + ']').setValue(true);
        });
    },

    createGroup: function () {
        Ext.widget('groupEdit', {
            title: "Tambah Group"
        });
    },


    deleteGroup: function (button) {
        var record = this.getGroupList().getSelectionModel().getSelection()[0];
        var self = this;
        if (record) {
            Ext.Ajax.request({
                url: AdmindukWS.config.groupUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    if (response.responseText.indexOf("Silahkan mengisi username") > 0) {
                        window.location = "loginpage";
                    } else {
                        AdmindukWS.util.MessageBox.showMessageBoxDelete(response, options, 'Group');
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
    updateGroup: function (button) {
        var self = this;
        var form = this.getGroupEditForm();
        var values = form.getValues();
        var record = form.getRecord();

        var rolesTemp = [];

        Ext.each(values.roles, function (role) {
            Ext.Array.push(rolesTemp, {
                authority: role
            });
        });

        values.roles = rolesTemp;

        if (form.getForm().isValid()) {
            if (record) {
                Ext.Ajax.request({
                    url: AdmindukWS.config.groupUrl + record.data.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(values),
                    success: function (response, options) {
                        if (response.responseText.indexOf("Silahkan mengisi username") > 0) {
                            window.location = "loginpage";
                        } else {
                            AdmindukWS.util.MessageBox.showMessageBoxPostPut(response, options, 'Group');
                            self._doGridRefresh();
                        }
                    },
                    failure: function (fp, o) {
                        console.info('failure o', o);
                        AdmindukWSErrorUtil.failureHandler(fp, o);
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: AdmindukWS.config.groupUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(values),
                    success: function (response, options) {
                        if (response.responseText.indexOf("Silahkan mengisi username") > 0) {
                            window.location = "loginpage";
                        } else {
                        AdmindukWS.util.MessageBox.showMessageBoxPostPut(response, options, 'Group');
                        self._doGridRefresh();
                        }
                    },
                    failure: function (fp, o) {
                        console.info('failure o', o);
                        AdmindukWSErrorUtil.failureHandler(fp, o);
                    }
                });
            }

            this.getGroupEditWindow().close();
        }
    },

    _toggleDeleteButton: function (enable) {
        var button = this.getGroupDeleteButton();
        if (enable) {
            button.enable();
        } else {
            button.disable();
        }
    },

    _doGridRefresh: function () {
        this.getGroupList().down('pagingtoolbar').doRefresh();
    }
});