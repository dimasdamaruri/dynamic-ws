Ext.define('AdmindukWS.controller.MethodController', {
    extend: 'Ext.app.Controller',
    views: [
        'AdmindukWS.view.Method.FormMethod'
                , 'AdmindukWS.view.Method.GridMethodParam'
                , 'AdmindukWS.view.Method.GridMethodSelectedColumn'
                , 'AdmindukWS.view.Method.ListMethod'
                , 'AdmindukWS.view.Method.DetailListMethod'
                , 'AdmindukWS.view.Method.MainTabMethod'
    ],
    refs: [
        {
            ref: 'FormMethod',
            selector: 'FormMethod'
        },
        {
            ref: 'GridMethodParam',
            selector: 'GridMethodParam'
        },
        {
            ref: 'ListMethod',
            selector: 'ListMethod'
        },
        {
            ref: 'DetailListMethod',
            selector: 'DetailListMethod'
        },
        {
            ref: 'MainTabMethod',
            selector: 'MainTabMethod'
        }
    ],
    requires: [
    ],
    SELECTEDVIEW: {},
    record: null,
    KD_URL: '',
    KD_URL_LIST: '',
    NAMA_METODE: '',
    NAMA_INSTANSI: '',
    init: function() {
        var me = this;

        this.control({
            'ListMethod': {
                itemclick: this.methodSelected
            },
            'ListMethod button[action= newMethod]': {
                click: this.newMethod
            },
            'FormMethod combo[name=NAMA_VIEW]': {
                select: this.comboViewGetParams
            },
            'FormMethod button[action=save]': {
                click: this.saveMethod
            },
            'ListMethod button[action=deleteMethod]': {
                click: this.deleteMetode
            }
        });
    },
    deactivatedTabForm: function() {
        this.getFormMethod().disable();
        this.getMainTabMethod().setActiveTab(0);
        this.getListMethod().getStore().reload();
    }
    , activatedTabForm: function() {
        this.getFormMethod().enable();
        this.getMainTabMethod().setActiveTab(this.getFormMethod());
    },
    newMethod: function(button) {
        this.activatedTabForm();
        this.getMainTabMethod().setActiveTab(1);
        this.getFormMethod().getForm().reset();
//        this.getFormMethod().down("textfield[name=USER_ID]").setDisabled(false);
    },
    deleteMetode: function(button) {
        var self = this;
        var objForSave = {};
        objForSave = {
            KODE: 'DML_SAVE_DELETE_MASTER_METODE',
            NAMA_METODE: this.NAMA_METODE,
            KD_URL: this.KD_URL,
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
                            Ext.Msg.alert('Info', 'Data Berhasil Dihapus.');
//                            self.getFormUser().getForm().reset();
                            self.getListMethod().getStore().reload();
                            self.deactivatedTabForm();
//                            self.disableBtnUser();
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
    methodSelected: function(grid, record) {
        var me = this;
        this.record = record;

        this.KD_URL = record.data.KD_URL;
        this.KD_URL_LIST = record.data.KD_URL_LIST;
        this.NAMA_METODE = record.data.NAMA_METODE;
        this.NAMA_INSTANSI = record.data.NAMA_INSTANSI;

        var formDetail = this.getDetailListMethod();
        formDetail.loadRecord(record);

        var grid = formDetail.down('GridDetailParameterMethod[name=gridDetailParameterMethod]');

        Ext.require('AdmindukWS.model.MethodParam');
        var storeGridDetail = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.MethodParam',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GETDATA_LIST_METODE_DETIL&KD_URL=" + me.parseSlash(record.data.KD_URL)
                        + "&NAMA_INSTANSI=" + record.data.NAMA_INSTANSI + "&NAMA_METODE=" + record.data.NAMA_METODE,
                reader: {
                    type: 'json',
                    root: 'content',
                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });

        grid.reconfigure(storeGridDetail);

        var gridKolom = formDetail.down('GridDetailKolomMethod[name=gridDetailKolomMethod]');

        Ext.require('AdmindukWS.model.MethodParam');
        var storeGridDetailKolom = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.MethodParam',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GETDATA_LIST_METODE_KOLOM&KD_URL=" + me.parseSlash(record.data.KD_URL)
                    + "&NAMA_INSTANSI=" + record.data.NAMA_INSTANSI + "&NAMA_METODE=" + record.data.NAMA_METODE,
                reader: {
                    type: 'json',
                    root: 'content',
                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });

        gridKolom.reconfigure(storeGridDetailKolom);
    },
    comboViewGetParams: function(combo, selection) {
        this.SELECTEDVIEW = selection[0].data;

        var formMethod = this.getFormMethod();
        var grid = formMethod.down('GridMethodParam[name=listGridMethodParam]');

        Ext.require('AdmindukWS.model.MethodParam');
        var storeGridMethodParam = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.MethodParam',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GETDATA_LIST_PARAMETER",
                reader: {
                    type: 'json',
                    root: 'content',
                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });

        grid.reconfigure(storeGridMethodParam);

        var gridSelectedParam = formMethod.down('GridMethodSelectedColumn[name=listGridMethodSelectedColumn]');

        Ext.require('AdmindukWS.model.MethodParam');
        var storeGridMethodSelectedParam = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.MethodParam',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GETDATA_LIST_KOLOM&KD_VIEW=" + this.SELECTEDVIEW.NAMA_VIEW,
                reader: {
                    type: 'json',
                    root: 'content',
                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });

        gridSelectedParam.reconfigure(storeGridMethodSelectedParam);
    },
    saveMethod: function() {
        var me = this;
        var form = this.getFormMethod();
        var gridParam = form.down('GridMethodParam[name=listGridMethodParam]');
        var gridColumn = form.down('GridMethodSelectedColumn[name=listGridMethodSelectedColumn]');

        var arrInsert = new Array();
        var arrDelete = new Array();
        if (form.getForm().isValid()) {
            console.log("valid");

            var objD = {
                KODE: 'DML_SAVE_DELETE_MASTER_METODE',
                NAMA_METODE: form.down('textfield[name=NAMA_METODE]').getValue(),
                KD_VIEW: form.down('combo[name=NAMA_VIEW]').getValue(),
                NAMA_INSTANSI: form.down('combo[name=NAMA_INSTANSI]').getValue()
            };
            arrDelete.push(objD);

            Ext.Ajax.request({
                url: AdmindukWS.config.saveArrayUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode(arrDelete),
                success: function(response, options) {
                    console.log("Data berhasil dihapus --> response : ", response);
                    var is_paging = form.down('checkboxfield[name=IS_PAGING]').getValue() ? "1" : "0";
                    var is_keluarga = form.down('checkboxfield[name=IS_KELUARGA]').getValue() ? "1" : "0";

                    gridParam.getStore().each(function(record){
                        console.log('param.data ~> ', record.data);
                        if (record.data.FLAG) {
                            var objT = null;
                            var like = null;
                            if (record.data.IS_LIKE === false) {
                                like = '0';
                            } else {
                                like = '1';
                            }
                            objT = {
                                KODE: 'DML_SAVE_INSERT_MASTER_METODE',
                                NAMA_METODE: form.down('textfield[name=NAMA_METODE]').getValue(),
                                KD_VIEW: form.down('combo[name=NAMA_VIEW]').getValue(),
                                KD_URL: form.down('combo[name=KD_URL]').getValue(),
                                KD_PARAMETER: record.data.COLUMN_NAME,
                                KETERANGAN: record.data.KETERANGAN,
                                IS_LIKE: like,
                                IS_PAGING: is_paging,
                                IS_KELUARGA: is_keluarga,
                                IS_VIEW: '0',
                                PAGESIZE: 0,
                                NAMA_INSTANSI: form.down('combo[name=NAMA_INSTANSI]').getValue(),
                                ID_URUT: record.data.ID_URUT
                            };

                            arrInsert.push(objT);
                        }
                    });

                    gridColumn.getStore().each(function(record)
                    {
                        console.log('column.data ~> ', record.data);
                        if (record.data.FLAG) {
                            var objT = null;
                            objT = {
                                KODE: 'DML_SAVE_INSERT_MASTER_METODE',
                                NAMA_METODE: form.down('textfield[name=NAMA_METODE]').getValue(),
                                KD_VIEW: form.down('combo[name=NAMA_VIEW]').getValue(),
                                KD_URL: form.down('combo[name=KD_URL]').getValue(),
                                KD_PARAMETER: record.data.COLUMN_NAME,
                                IS_LIKE: '0',
                                IS_PAGING: is_paging,
                                IS_KELUARGA: is_keluarga,
                                IS_VIEW: '1',
                                PAGESIZE: 0,
                                NAMA_INSTANSI: form.down('combo[name=NAMA_INSTANSI]').getValue(),
                                ID_URUT: record.data.ID_URUT
                            };

                            arrInsert.push(objT);
                        }
                    });

                    Ext.Ajax.request({
                        url: AdmindukWS.config.saveArrayUrl,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: Ext.JSON.encode(arrInsert),
                        success: function(response, options) {
                            form.getForm().reset();
                            gridParam.getStore().removeAll();
                            gridColumn.getStore().removeAll();

                            Ext.Msg.alert('Info', 'Data Berhasil Disimpan.');
                            me.getFormMethod().getForm().reset();
                            me.getListMethod().getStore().reload();
                            me.deactivatedTabForm();
        //                    me.disableBtnInstansi();
                        },
                        failure: function(fp, o) {
                            console.info('failure o', o);
                            AdmindukWSErrorUtil.failureHandler(fp, o);
                        }
                    });
                },
                failure: function(fp, o) {
                    console.info('failure o', o);
                    CoalsysErrorUtil.failureHandler(fp, o);
                }
            });
        } else {
            console.log("not valid");
        }
    },
    parseSlash: function(val) {
        var result = val.replace(/\//g, '~').replace(/\./g, '+');
        return result;
    }
});