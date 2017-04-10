Ext.define('AdmindukWS.controller.MasterUrlController', {
    extend: 'Ext.app.Controller',
    views: [
        'AdmindukWS.view.MasterUrl.MainTabMasterUrl'
                , 'AdmindukWS.view.MasterUrl.FormMasterUrl'
                , 'AdmindukWS.view.MasterUrl.ListMasterUrl'
    ],
    refs: [
        {
            ref: 'MainTabMasterUrl',
            selector: 'MainTabMasterUrl'
        },
        {
            ref: 'FormMasterUrl',
            selector: 'FormMasterUrl'
        },
        {
            ref: 'ListMasterUrl',
            selector: 'ListMasterUrl'
        }
    ],
    requires: [
    ],
    record:null,
    KD_URL:'',
    init: function() {
        var me = this;

        this.control({
            'ListMasterUrl': {
                itemclick: this.enableBtnUrl
            },
            'FormMasterUrl button[action=save]': {
                click: this.saveUrl
            },
            'FormMasterUrl button[action=cancel]': {
                click: this.cancelUrl
            },
            'ListMasterUrl button[action= newUrl]': {
                click: this.addUrl
            },
            'ListMasterUrl button[action= deleteUrl]': {
                click: this.deleteUrl
            }
        });
    },
    deactivatedTabForm: function() {
        this.getFormMasterUrl().disable();
        this.getMainTabMasterUrl().setActiveTab(0);
        this.getListMasterUrl().getStore().reload();
    }
    , activatedTabForm: function() {
        this.getFormMasterUrl().enable();
        this.getMainTabMasterUrl().setActiveTab(this.getFormMasterUrl());
    },
    enableBtnUrl: function(grid, record) {
        this.record = record;
        this.getListMasterUrl().down("button[action=deleteUrl]").setDisabled(false);
        this.KD_URL = record.data.KD_URL;
    },
    disableBtnUrl: function(grid, record) {
        this.getListMasterUrl().down("button[action=deleteUrl]").setDisabled(true);
    },
    constructObj: function(objDest, objSrc) {
        for (var prop in objSrc) {
            objDest[prop] = objSrc[prop];
        }

        return objDest;
    },
    deleteUrl: function(button) {
        var self = this;
        var objForSave = {};
        objForSave = {
            KODE: 'DML_SAVE_DELETE_MASTER_URL',
            KD_URL: this.KD_URL

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
                            Ext.Msg.alert('Info', 'Data Berhasil DIHAPUS.');
                            self.getFormMasterUrl().getForm().reset();
                            self.getListMasterUrl().getStore().reload();
                            self.deactivatedTabForm();
                            self.disableBtnUrl();
                        }
                    },
                    failure: function (fp, o) {
                        console.info('failure o', o);
                        AdmindukWSErrorUtil.failureHandler(fp, o);
                    }
                });
            }
            else {
                //some code
            }
        });
    },
    cancelUrl: function(button) {
        this.getFormMasterUrl().getForm().reset();
        this.deactivatedTabForm();
        this.disableBtnUrl();
    },
    saveUrl: function(button) {
        console.log("save button")
        var self = this;
        var formUrl = this.getFormMasterUrl();
        var values = formUrl.getValues();
        var objForSave = {};
        var user = AdmindukWS.util.SecurityHelper.getNama();

        objForSave = {
            KODE: 'DML_SAVE_INSERT_MASTER_URL',
            CREATE_BY: user
        };
        
        objForSave = this.constructObj(objForSave, values);

        if (formUrl.getForm().isValid()) {
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
                        self.getFormMasterUrl().getForm().reset();
                        self.getListMasterUrl().getStore().reload();
                        self.deactivatedTabForm();
                        self.disableBtnUrl();
                    }
                },
                failure: function (fp, o) {
                    console.info('failure o', o);
                    AdmindukWSErrorUtil.failureHandler(fp, o);
                }
            });

        } else {
            alert("Form tidak valid");
        }
    },
    addUrl: function(button) {
        this.activatedTabForm();
        this.getMainTabMasterUrl().setActiveTab(1);
        this.getFormMasterUrl().getForm().reset();
        this.getFormMasterUrl().down("textfield[name=KD_URL]").setDisabled(false);


    }
});