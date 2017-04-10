Ext.define('AdmindukWS.controller.InstansiController', {
    extend: 'Ext.app.Controller',
    views: [
        'AdmindukWS.view.Instansi.MainTabInstansi'
                , 'AdmindukWS.view.Instansi.FormInstansi'
                , 'AdmindukWS.view.Instansi.ListInstansi'
    ],
    refs: [
        {
            ref: 'MainTabInstansi',
            selector: 'MainTabInstansi'
        },
        {
            ref: 'FormInstansi',
            selector: 'FormInstansi'
        },
        {
            ref: 'ListInstansi',
            selector: 'ListInstansi'
        }
    ],
    requires: [
    ],
    record:null,
    isEdit: false,
    NAMA_INSTANSI: '',
    init: function() {
        var me = this;

        this.control({
            'ListInstansi': {
                itemclick: this.enableBtnInstansi
            },
            'FormInstansi button[action=save]': {
                click: this.saveInstansi
            },
            'FormInstansi button[action=cancel]': {
                click: this.cancelInstansi
            },
            'ListInstansi button[action= newInstansi]': {
                click: this.addInstansi
            },
            'ListInstansi button[action= editInstansi]': {
                click: this.editInstansi
            },
            'ListInstansi button[action= deleteInstansi]': {
                click: this.deleteInstansi
            }
        });
    },
    deactivatedTabForm: function() {
        this.getFormInstansi().disable();
        this.getMainTabInstansi().setActiveTab(0);
        this.getListInstansi().getStore().reload();
    }
    , activatedTabForm: function() {
        this.getFormInstansi().enable();
        this.getMainTabInstansi().setActiveTab(this.getFormInstansi());
    },
    enableBtnInstansi: function(grid, record) {
        this.record = record;
        this.getListInstansi().down("button[action=editInstansi]").setDisabled(false);
        this.getListInstansi().down("button[action=deleteInstansi]").setDisabled(false);
        this.NAMA_INSTANSI = record.data.NAMA_INSTANSI;
    },
    disableBtnInstansi: function(grid, record) {
        this.getListInstansi().down("button[action=editInstansi]").setDisabled(true);
        this.getListInstansi().down("button[action=deleteInstansi]").setDisabled(true);
    },
    editInstansi: function(button) {
        this.isEdit = true;
        this.activatedTabForm();
        var Tabs = this.getMainTabInstansi();
        Tabs.setActiveTab(1);
        var form = this.getFormInstansi();
        this.getFormInstansi().down("textfield[name=NAMA_INSTANSI]").setDisabled(true);
        form.loadRecord(this.record);
    },
    constructObj: function(objDest, objSrc) {
        for (var prop in objSrc) {
            objDest[prop] = objSrc[prop];
        }

        return objDest;
    },
    deleteInstansi: function(button) {
        var self = this;
        var formInstansi = this.getFormInstansi();
        var objForSave = {};
        objForSave = {
            KODE: 'DML_SAVE_DELETE_MASTER_INSTANSI',
            NAMA_INSTANSI: this.NAMA_INSTANSI
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
                            self.getFormInstansi().getForm().reset();
                            self.getListInstansi().getStore().reload();
                            self.deactivatedTabForm();
                            self.isEdit = false;
                            self.disableBtnInstansi();
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
    cancelInstansi: function(button) {
        this.getFormInstansi().getForm().reset();
        this.deactivatedTabForm();
        this.isEdit = false;
        this.disableBtnInstansi();
    },
    saveInstansi: function(button) {
        console.log("save button")
        var self = this;
        var formInstansi = this.getFormInstansi();
        var values = formInstansi.getValues();
        var objForSave = {};

        if (this.isEdit) {
            objForSave = {
                KODE: 'DML_SAVE_UPDATE_MASTER_INSTANSI',
                NAMA_INSTANSI: this.NAMA_INSTANSI
            };
        } else {
            objForSave = {
                KODE: 'DML_SAVE_INSERT_MASTER_INSTANSI'
            };
        }
        objForSave = this.constructObj(objForSave, values);

        if (formInstansi.getForm().isValid()) {
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
                        self.getFormInstansi().getForm().reset();
//                        self.getListInstansi().getStore().reload();
                        self.deactivatedTabForm();
                        self.isEdit = false;
                        self.disableBtnInstansi();
                    }
                },
//                failure: function(fp, o) {
//                    console.info('failure o', o);
//                    Ext.Msg.alert('Error', 'Terjadi Kesalahan Dalam Penyimpanan.');
//                }
                failure: function (fp, o) {
                    console.info('failure o', o);
                    AdmindukWSErrorUtil.failureHandler(fp, o);
                }
            });

        } else {
            alert("Form tidak valid");
        }
    },
    addInstansi: function(button) {
        this.isEdit = false;
        this.activatedTabForm();
        this.getMainTabInstansi().setActiveTab(1);
        this.getFormInstansi().getForm().reset();
        this.getFormInstansi().down("textfield[name=NAMA_INSTANSI]").setDisabled(false);


    }
});