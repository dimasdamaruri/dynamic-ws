/**
 * Created with IntelliJ IDEA.
 * User: KONOHA
 * Date: 22/08/14
 * Time: 22:30
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AdmindukWS.controller.MasterParameterController', {
    extend: 'Ext.app.Controller',
    views: [
        'AdmindukWS.view.MasterParameter.MainTabMasterParameter'
        , 'AdmindukWS.view.MasterParameter.FormMasterParameter'
        , 'AdmindukWS.view.MasterParameter.ListMasterParameter'
    ],
    refs: [
        {
            ref: 'MainTabMasterParameter',
            selector: 'MainTabMasterParameter'
        },
        {
            ref: 'FormMasterParameter',
            selector: 'FormMasterParameter'
        },
        {
            ref: 'ListMasterParameter',
            selector: 'ListMasterParameter'
        }
    ],
    requires: [
    ],
    record:null,
    KD_PARAMETER:'',
    COLUMN_NAME:'',
    init: function() {
        var me = this;

        this.control({
            'ListMasterParameter': {
                itemclick: this.enableBtnParameter
            },
            'FormMasterParameter button[action=save]': {
                click: this.saveParameter
            },
            'FormMasterParameter button[action=cancel]': {
                click: this.cancelParameter
            },
            'ListMasterParameter button[action=newParameter]': {
                click: this.addParameter
            },
            'ListMasterParameter button[action=deleteParameter]': {
                click: this.deleteParameter
            }
        });
    },
    deactivatedTabForm: function() {
        this.getFormMasterParameter().disable();
        this.getMainTabMasterParameter().setActiveTab(0);
        this.getListMasterParameter().getStore().reload();
    }
    , activatedTabForm: function() {
        this.getFormMasterParameter().enable();
        this.getMainTabMasterParameter().setActiveTab(this.getFormMasterParameter());
    },
    enableBtnParameter: function(grid, record) {
        this.record = record;
        this.getListMasterParameter().down("button[action=deleteParameter]").setDisabled(false);
        this.KD_PARAMETER = record.data.KD_PARAMETER;
        this.COLUMN_NAME=record.data.COLUMN_NAME;
    },
    disableBtnParameter: function(grid, record) {
        this.getListMasterParameter().down("button[action=deleteParameter]").setDisabled(true);
    },
    constructObj: function(objDest, objSrc) {
        for (var prop in objSrc) {
            objDest[prop] = objSrc[prop];
        }

        return objDest;
    },
    deleteParameter: function(button) {
        var self = this;
        var objForSave = {};
        objForSave = {
            KODE: 'DML_SAVE_DELETE_MASTER_PARAMETER',
            KD_PARAMETER: this.COLUMN_NAME

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
                            self.getFormMasterParameter().getForm().reset();
                            self.getListMasterParameter().getStore().reload();
                            self.deactivatedTabForm();
                            self.disableBtnParameter();
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
    cancelParameter: function(button) {
        this.getFormMasterParameter().getForm().reset();
        this.deactivatedTabForm();
        this.disableBtnParameter();
    },
    saveParameter: function(button) {
        console.log("save button")
        var self = this;
        var formParameter = this.getFormMasterParameter();
        var values = formParameter.getValues();
        var objForSave = {};
        var user = AdmindukWS.util.SecurityHelper.getNama();

        objForSave = {
            KODE: 'DML_SAVE_INSERT_MASTER_PARAMETER',
            KD_PARAMETER: this.COLUMN_NAME,
            CREATE_BY: user
        };

        objForSave = this.constructObj(objForSave, values);

        if (formParameter.getForm().isValid()) {
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
                        self.getFormMasterParameter().getForm().reset();
                        self.getListMasterParameter().getStore().reload();
                        self.deactivatedTabForm();
                        self.disableBtnParameter();
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
    addParameter: function(button) {
        this.activatedTabForm();
        this.getMainTabMasterParameter().setActiveTab(1);
        this.getFormMasterParameter().getForm().reset();
        this.getFormMasterParameter().down("textfield[name=KD_PARAMATER]").setDisabled(false);


    }
});