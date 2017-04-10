Ext.define('AdmindukWS.controller.AksesDataBulananController', {
    extend: 'Ext.app.Controller',
    views: [
        'AdmindukWS.view.AksesData.AksesDataBulanTerakhir.ListAksesDataBulanTerakhir',
        'AdmindukWS.view.AksesData.AksesDataBulanTerakhir.ListSummaryAksesDataBulanan',
        'AdmindukWS.view.AksesData.AksesDataBulanTerakhir.MainAksesDataBulanTerakhir'
    ],
    refs: [
        {
            ref: 'ListAksesDataBulanTerakhir',
            selector: 'ListAksesDataBulanTerakhir'
        }, {
            ref: 'ListSummaryAksesDataBulanan',
            selector: 'ListSummaryAksesDataBulanan'
        },
        {
            ref: 'MainAksesDataBulanTerakhir',
            selector: 'MainAksesDataBulanTerakhir'
        }
    ],
    requires: [
    ],
    init: function() {
        var me = this;

        this.control({
            'MainAksesDataBulanTerakhir': {
                afterrender: this.aksesDataBulanTerakhirAfterrender
            },
            'MainAksesDataBulanTerakhir button[action=refresh]': {
                click: this.refreshChart
            },
            'MainAksesDataBulanTerakhir combo[action=instansiAksesBulanTerakhir]': {
                select: this.instansiAksesBulanTerakhir
            }
        });
    },
    instansiAksesBulanTerakhir: function(grid, selection) {
        var me = this;
        if (selection[0].data) {
            me.comboRefreshChart(selection[0].data.NAMA_INSTANSI);
        }
    },
    generateData: function(instansi) {
        var data = [];
        
        if (!instansi) {
            Ext.Ajax.request({
                url: AdmindukWS.config.servicePath + "/kode=GET_BULAN_TERAKHIR",
                method: 'GET',
                async: false,
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function(response, options) {
                    console.log("--> response [", Ext.JSON.decode(response.responseText), "]");
                    var objResponse = Ext.JSON.decode(response.responseText);
                    var arrResponse = objResponse.content;

                    for (var i = 0; i < arrResponse.length; i++) {
                        data.push({
                            JUMLAH_DATA: arrResponse[i].JUMLAH_DATA,
                            NAMA_DATA: arrResponse[i].NAMA_DATA
                        });
                    }
                },
                failure: function(response, options) {
                    AdmindukWS.util.MessageBox.showMessageBoxDelete(response, options, 'Group');
                }
            });
        } else {
            Ext.Ajax.request({
                url: AdmindukWS.config.servicePath + "/kode=GET_BULAN_TERAKHIR&INSTANSI=" + instansi,
                method: 'GET',
                async: false,
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function(response, options) {
                    console.log("--> response [", Ext.JSON.decode(response.responseText), "]");
                    var objResponse = Ext.JSON.decode(response.responseText);
                    var arrResponse = objResponse.content;

                    for (var i = 0; i < arrResponse.length; i++) {
                        data.push({
                            JUMLAH_DATA: arrResponse[i].JUMLAH_DATA,
                            NAMA_DATA: arrResponse[i].NAMA_DATA
                        });
                    }
                },
                failure: function(response, options) {
                    AdmindukWS.util.MessageBox.showMessageBoxDelete(response, options, 'Group');
                }
            });
        }
        return data;
    },
    aksesDataBulanTerakhirAfterrender: function() {

        var panel = this.getMainAksesDataBulanTerakhir().down('panel[name=aksesDataBulanTerakhirPanel]');
        var me = this;
        var chartStore = Ext.create('Ext.data.JsonStore', {
            fields: ['JUMLAH_DATA', 'NAMA_DATA'],
            data: me.generateData(),
            autoLoad: true
        });
        panel.add(
                {
                    xtype: 'chart',
                    style: 'background:#fff',
                    animate: true,
                    shadow: true,
                    store: chartStore,
                    name: 'chartAksesDataBulanTerakhir',
                    legend: {
                        position: 'float',
                        x: 800,
                        y: 0
                        , renderer: function(value, label, storeItem) {
                            // storeItem is your model, so return the value you want as label
                            return "asd : asd";
                        }
                    },
                    axes: [{
                            type: 'Numeric',
                            position: 'left',
                            fields: ['JUMLAH_DATA'],
                            label: {
                                renderer: Ext.util.Format.numberRenderer('0,0')
                            },
                            title: 'Jumlah Data',
                            grid: true,
                            minimum: 0
                        }, {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['NAMA_DATA'],
                            title: 'Tanggal'
                        }],
                    series: [{
                            type: 'column',
                            axis: 'bottom',
                            highlight: true,
                            xField: 'NAMA_DATA',
                            yField: 'JUMLAH_DATA',
                            tips: {
                                trackMouse: true,
                                width: 140,
                                height: 50,
                                renderer: function(storeItem, item) {
                                    // change panel header
                                    this.setTitle(storeItem.get('NAMA_DATA'));

                                    // change panel body              
                                    this.update(
                                            storeItem.get('JUMLAH_DATA')
                                            );
                                }
                            }
                        }]
                });

    },
    comboRefreshChart: function(instansi) {
        var me = this;
        if(instansi) {
            var generate = me.generateData(instansi);
            var panel = me.getMainAksesDataBulanTerakhir().down('panel[name=aksesDataBulanTerakhirPanel]');
            var store = panel.down('chart[name=chartAksesDataBulanTerakhir]').getStore();
            store.loadData(generate);
            var storeList = me.getListAksesDataBulanTerakhir().getStore();
            storeList.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_BULAN_TERAKHIR&INSTANSI=" + instansi;
            storeList.reload();

            var storeListSum = me.getListSummaryAksesDataBulanan().getStore();
            storeListSum.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_BULAN_TERAKHIR_TOTAL&INSTANSI=" + instansi;
            storeListSum.reload();
        } else {
            var generate = me.generateData();
            var panel = me.getMainAksesDataBulanTerakhir().down('panel[name=aksesDataBulanTerakhirPanel]');
            var store = panel.down('chart[name=chartAksesDataBulanTerakhir]').getStore();
            store.loadData(generate);
            var storeList = me.getListAksesDataBulanTerakhir().getStore();
            storeList.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_BULAN_TERAKHIR";
            storeList.reload();

            var storeListSum = me.getListSummaryAksesDataBulanan().getStore();
            storeListSum.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_BULAN_TERAKHIR_TOTAL";
            storeListSum.reload();
        }
    },
    refreshChart: function() {
        this.getMainAksesDataBulanTerakhir().down("combo[action=instansiAksesBulanTerakhir]").clearValue();
        var generate = this.generateData();
        var panel = this.getMainAksesDataBulanTerakhir().down('panel[name=aksesDataBulanTerakhirPanel]');
        var store = panel.down('chart[name=chartAksesDataBulanTerakhir]').getStore();
        store.loadData(generate);
        var storeList = this.getListAksesDataBulanTerakhir().getStore();
        storeList.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_BULAN_TERAKHIR";
        storeList.reload();

        var storeListSum = this.getListSummaryAksesDataBulanan().getStore();
        storeListSum.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_BULAN_TERAKHIR_TOTAL";
        storeListSum.reload();
    }
});