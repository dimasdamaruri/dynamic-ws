Ext.define('AdmindukWS.controller.MasterUserController', {
    extend: 'Ext.app.Controller',
    views: [
        'AdmindukWS.view.MasterUser.MainTabUser'
                , 'AdmindukWS.view.MasterUser.FormUser'
                , 'AdmindukWS.view.MasterUser.ListUser'
    ],
    refs: [
        {
            ref: 'MainTabUser',
            selector: 'MainTabUser'
        },
        {
            ref: 'FormUser',
            selector: 'FormUser'
        },
        {
            ref: 'ListUser',
            selector: 'ListUser'
        }
    ],
    requires: [
    ],
    record: null,
    isEdit: false,
    USER_ID: '',
    init: function() {
        var me = this;

        this.control({
            'ListUser': {
                itemclick: this.enableBtnUser
            },
            'FormUser button[action=saveUser]': {
                click: this.saveUser
            },
            'FormUser button[action=cancelUser]': {
                click: this.cancelUser
            },
            'ListUser button[action= newUser]': {
                click: this.addUser
            },
            'ListUser button[action= editUser]': {
                click: this.editUser
            },
            'ListUser button[action= deleteUser]': {
                click: this.deleteUser
            },
            'ListUser button[action= searchUser]': {
                click: this.searchUser
            },
            'ListUser button[action= clearSearchUser]': {
                click: this.clearSearchUser
            },
            'FormUser combobox[name= NAMA_PROP]': {
                change: this.getDataKabupaten
            }
        });
    },
    searchUser: function(button) {
        var listForm = this.getListUser();
        var valCombo = listForm.down("combo[name=SEARCH_USER]").getValue();
        var valSearch = listForm.down("textfield[name=search]").getValue();
        if(!valCombo) {
            Ext.Msg.alert('Info', 'Combo Search not valid.');
        } 
        
        if(!valSearch) {
            Ext.Msg.alert('Info', 'Field Search not valid.');
        }
        
        //lakukan pencarian. karena belum ada dmlnya dibuat 
//        var storeList = listForm.getStore();
//        storeList.getProxy().url = AdmindukWS.config.servicePath + "/kode=CARI&KEY=" + valCombo + "&VALUE=" + valSearch;
//        storeList.reload();
    }, 
    clearSearchUser: function(button) {
        var listForm = this.getListUser();
        listForm.down("textfield[name=search]").setText("");
        listForm.down("combo[name=SEARCH_USER]").clearValue();
        var storeList = listForm.getStore();
        storeList.getProxy().url = AdmindukWS.config.servicePath + "/kode=GETDATA_LIST_USER";
        storeList.reload();
    },
    addUser: function(button) {
        this.isEdit = false;
        this.activatedTabForm();
        this.getMainTabUser().setActiveTab(1);
        this.getFormUser().getForm().reset();
        this.getFormUser().down("textfield[name=USER_ID]").setDisabled(false);
    },
    getDataKabupaten: function() {

        var form = this.getFormUser();
        var noProp = form.down("combo[name=NAMA_PROP]").getValue();
        var store = form.down('combo[name=KAB_NAME]').getStore();
        store.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_LIST_KAB&NO_PROP=" + noProp
        store.reload();

    },
    deactivatedTabForm: function() {
        this.getFormUser().disable();
        this.getMainTabUser().setActiveTab(0);
        this.getListUser().getStore().reload();
    }
    , activatedTabForm: function() {
        this.getFormUser().enable();
        this.getMainTabUser().setActiveTab(this.getFormUser());
    },
    enableBtnUser: function(grid, record) {
        this.record = record;
        this.getListUser().down("button[action=editUser]").setDisabled(false);
        this.getListUser().down("button[action=deleteUser]").setDisabled(false);
        this.USER_ID = record.data.USER_ID;
    },
    disableBtnUser: function(grid, record) {
        this.getListUser().down("button[action=editUser]").setDisabled(true);
        this.getListUser().down("button[action=deleteUser]").setDisabled(true);
    },
    editUser: function(button) {
        this.isEdit = true;
        this.activatedTabForm();
        var Tabs = this.getMainTabUser();
        Tabs.setActiveTab(1);
        var form = this.getFormUser();
        this.getFormUser().down("textfield[name=USER_ID]").setDisabled(true);
        form.loadRecord(this.record);
        this.getFormUser().down("textfield[name=PASSWORD]").setText("");
        this.getFormUser().down("textfield[name=RETYPE_PASSWORD]").setText("");
    },
    constructObj: function(objDest, objSrc) {
        for (var prop in objSrc) {
            objDest[prop] = objSrc[prop];
        }

        return objDest;
    },
    deleteUser: function(button) {
        var self = this;
        var objForSave = {};
        objForSave = {
            KODE: 'DML_SAVE_DELETE_MASTER_USER',
            USER_ID: this.USER_ID
        };
        Ext.Msg.confirm('Delete', 'Are you sure ?', function(btn) {
            if (btn === 'yes') {
                Ext.Ajax.request({
                    url: AdmindukWS.config.saveUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(objForSave),
                    success: function(response, options) {
                        if (response.responseText.indexOf("Silahkan mengisi username") > 0) {
                            window.location = "loginpage";
                        } else {
                            Ext.Msg.alert('Info', 'Data Berhasil Dihapus.');
                            self.getFormUser().getForm().reset();
                            self.getListUser().getStore().reload();
                            self.deactivatedTabForm();
                            self.isEdit = false;
                            self.disableBtnUser();
                        }
                    },
                    failure: function (fp, o) {
                        AdmindukWSErrorUtil.failureHandler(fp, o);
                    }
                });
            }
            else {
                //some code
            }
        });
    },
    cancelUser: function(button) {
        this.getFormUser().getForm().reset();
        this.deactivatedTabForm();
        this.isEdit = false;
        this.disableBtnUser();
    },
    saveUser: function(button) {
        var self = this;
        var formUser = this.getFormUser();
        var values = formUser.getValues();
        var objForSave = {};
        var user = AdmindukWS.util.SecurityHelper.getNama();
        delete values.RETYPE_PASSWORD;
        
        var noKabOrig = this.getFormUser().down("combo[name=KAB_NAME]").getValue().toString();
        var noKabAfterDelimiter = noKabOrig.substr(noKabOrig.indexOf(".") + 1);

        if (this.isEdit) {
            delete values.PASSWORD;
            objForSave = {
                KODE: 'DML_SAVE_UPDATE_MASTER_USER',
                USER_ID: this.USER_ID,
                NO_PROP:this.getFormUser().down("combo[name=NAMA_PROP]").getValue(),
                NO_KAB:noKabAfterDelimiter,
//                NO_KAB:this.getFormUser().down("combo[name=KAB_NAME]").getValue(),
//                IP_ADDRESS: this.getFormUser().down("textfield[name=IP_ADDRES]").getValue(),
                CREATE_BY: user
            };
        } else {
            this.getFormUser().down("textfield[name=PASSWORD]").allowBlank = false;
            this.getFormUser().down("textfield[name=RETYPE_PASSWORD]").allowBlank = false;
            objForSave = {
                KODE: 'DML_SAVE_INSERT_MASTER_USER',
                NO_PROP:this.getFormUser().down("combo[name=NAMA_PROP]").getValue(),
                NO_KAB:noKabAfterDelimiter,
//                NO_KAB:this.getFormUser().down("combo[name=KAB_NAME]").getValue(),
//                USERNAME: 'xxx',
//                IP_ADDRESS: this.getFormUser().down("textfield[name=IP_ADDRES]").getValue(),
                CREATE_BY: user
            };
        }
        objForSave = this.constructObj(objForSave, values);
        if (formUser.getForm().isValid()) {
            if(this.getFormUser().down("textfield[name=PASSWORD]").getValue() != this.getFormUser().down("textfield[name=RETYPE_PASSWORD]").getValue()){
                Ext.Msg.alert('Error', 'Password tidak valid');
            }else{
                Ext.Ajax.request({
                    url: AdmindukWS.config.saveUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(objForSave),
                    success: function(response, options) {
                        if (response.responseText.indexOf("Silahkan mengisi username") > 0) {
                            window.location = "loginpage";
                        } else {
                            Ext.Msg.alert('Info', 'Data Berhasil Disimpan.');
                            self.getFormUser().getForm().reset();
                            self.getListUser().getStore().reload();
                            self.deactivatedTabForm();
                            self.isEdit = false;
                            self.disableBtnUser();
                        }
                    },
                    failure: function (fp, o) {
                        AdmindukWSErrorUtil.failureHandler(fp, o);
                    }
                });
                
            }

        } else {
            alert("Form tidak valid");
        }
    }
});