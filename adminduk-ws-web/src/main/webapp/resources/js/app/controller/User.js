Ext.define('AdmindukWS.controller.User', {
    extend: 'Ext.app.Controller',
    views: [ 'user.List', 'user.Edit' ],
    allowWrite: AdmindukWS.util.SecurityHelper.isWriteAllowed("USER_WRITE"),
    models: [ 'User'],
    stores: [ 'Users'],
    refs: [
        {
            ref: 'userList',
            selector: 'userList'
        },
        {
            ref: 'userEditForm',
            selector: 'userEdit > form'
        },
        {
            ref: 'userGroupCheckbox',
            selector: 'userEdit checkboxgroup'
        },
        {
            ref: 'userEditWindow',
            selector: 'userEdit'
        },
        {
            ref: 'userDeleteButton',
            selector: 'userList button[action=delete]'
        }  ,
        {
            ref: 'userPagingToolbar',
            selector: 'userList pagingtoolbar'
        }
    ],

    init: function () {


        this.control({
            'userList': {
                itemdblclick: this.editUser
            }
        });
        if (this.allowWrite) {
            this.control({
                'userList': {
                    itemclick: this.enableButton,
                    selectionchange: this.userListSelectionChange
                },
                'userEdit button[action=save]': {
                    click: this.updateUser
                },
                'userList button[action=add]': {
                    click: this.createUser
                },
                'userList button[action=delete]': {
                    click: this.deleteUser
                }
            });
        } else {
            this.control({
                'userList': {
                    show: function (self) {
                        self.down("button[action=add]").setDisabled(true);
                        self.down("button[action=delete]").setDisabled(true);
                    }
                },
                'userEdit': {
                    show: function (self) {
                        self.down("button[action=save]").setDisabled(true);
                    }
                }
            });
        }

    },

    userListSelectionChange: function (sel, selected) {
        if (selected[0]) {
            this._toggleDeleteButton(true);
        } else {
            this._toggleDeleteButton(false);
        }
    },
    enableButton: function (button, record) {
        this._toggleDeleteButton(true);
    },

    editUser: function (grid, record) {
        var view = Ext.widget('userEdit');
        view.down('form').loadRecord(record);
        this._updateFormRecord(record.data);
    },

    _updateFormRecord: function (data) {
        if (data) {
            var groupsCheckbox = this.getUserGroupCheckbox();
            Ext.each(data.groups, function (group) {
                groupsCheckbox.down('[inputValue=' + group.id + ']').setValue(true);
            });
        }
    },

    createUser: function () {
        Ext.widget('userEdit', {
            title: "Tambah User",
            passwordRequired: true
        });
    },


    deleteUser: function (button) {
        var record = this.getUserList().getSelectionModel().getSelection()[0];
        var self = this;
        if (record) {
            Ext.Ajax.request({
                url: AdmindukWS.config.userUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    if (response.responseText.indexOf("Silahkan mengisi username") > 0) {
                        window.location = "loginpage";
                    } else {
                    AdmindukWS.util.MessageBox.showMessageBoxDelete(response, options, 'User');
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
    updateUser: function (button) {
        var self = this;
        var form = this.getUserEditForm();
        var values = form.getValues();
        var record = form.getRecord();

        var groupsTemp = [];

        Ext.each(values.groups, function (group) {
            Ext.Array.push(groupsTemp, {
                id: group
            });
        });

        values.groups = groupsTemp;


        values.password = Ext.isEmpty(values.pass) ? null : values.pass;

        delete values.pass;
        delete values.passConfirm;

        if (form.getForm().isValid()) {
            if (record) {
                Ext.Ajax.request({
                    url: AdmindukWS.config.userUrl + record.data.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(values),
                    success: function (response, options) {
                        if (response.responseText.indexOf("Silahkan mengisi username") > 0) {
                            window.location = "loginpage";
                        } else {
                        AdmindukWS.util.MessageBox.showMessageBoxPostPut(response, options, 'User');
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
                    url: AdmindukWS.config.userUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(values),
                    success: function (response, options) {
                        if (response.responseText.indexOf("Silahkan mengisi username") > 0) {
                            window.location = "loginpage";
                        } else {
                        AdmindukWS.util.MessageBox.showMessageBoxPostPut(response, options, 'User');
                        self._doGridRefresh();
                        }
                    },
                    failure: function (fp, o) {
                        console.info('failure o', o);
                        AdmindukWSErrorUtil.failureHandler(fp, o);
                    }
                });
            }

            this.getUserEditWindow().close();
        }
    },

    _toggleDeleteButton: function (enable) {
        var button = this.getUserDeleteButton();
        if (enable) {
            button.enable();
        } else {
            button.disable();
        }
    },

    _doGridRefresh: function () {
        this.getUserList().down('pagingtoolbar').doRefresh();
    }
});