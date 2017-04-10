Ext.define('AdmindukWS.controller.AksesDataMingguanController', {
    extend: 'Ext.app.Controller',
    views: [
        'AdmindukWS.view.AksesData.aksesDataMingguTerakhir.ListAksesDataMingguan',
        'AdmindukWS.view.AksesData.aksesDataMingguTerakhir.ListSummaryAksesDataMingguan',
        'AdmindukWS.view.AksesData.aksesDataMingguTerakhir.MainAksesDataMingguTerakhir'
    ],
    refs: [
        {
            ref: 'ListAksesDataMingguan',
            selector: 'ListAksesDataMingguan'
        },
        {
            ref: 'ListSummaryAksesDataMingguan',
            selector: 'ListSummaryAksesDataMingguan'
        },
        {
            ref: 'MainAksesDataMingguTerakhir',
            selector: 'MainAksesDataMingguTerakhir'
        }
    ],
    requires: [
    ],
    instansi: "",
    init: function() {
        var me = this;

        this.control({
            'MainAksesDataMingguTerakhir': {
                afterrender: this.aksesDataMingguAfterrender
            },
            'MainAksesDataMingguTerakhir button[action=refresh]': {
                click: this.refreshChart
            },
            'MainAksesDataMingguTerakhir combo[action=instansiAksesMingguTerakhir]': {
                select: this.instansiAksesMingguTerakhir
            }
        });
    },
    instansiAksesMingguTerakhir: function(grid, selection) {
        var me = this;
        if (selection[0].data) {
            me.comboRefreshChart(selection[0].data.NAMA_INSTANSI);
        }
    },
    generateData: function(instansi) {
        var data = [];

        if (!instansi) {
            Ext.Ajax.request({
                async: false,
                url: AdmindukWS.config.servicePath + "/kode=GET_MINGGU_TERAKHIR",
                method: 'GET',
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
                async: false,
                url: AdmindukWS.config.servicePath + "/kode=GET_MINGGU_TERAKHIR&INSTANSI=" + instansi,
                method: 'GET',
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
    aksesDataMingguAfterrender: function() {
        var panel = this.getMainAksesDataMingguTerakhir().down('panel[name=aksesDataMingguPanel]');
        var me = this;
        var chartStore = Ext.create('Ext.data.JsonStore', {
            fields: ['JUMLAH_DATA', 'NAMA_DATA'],
            data: me.generateData(),
            autoLoad: true
        });
        panel.add({
            xtype: 'chart',
            name: 'chartAksesDataMinggu',
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: chartStore,
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
                    title: 'Jumlah Akses',
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
            var panel = me.getMainAksesDataMingguTerakhir().down('panel[name=aksesDataMingguPanel]');
            var store = panel.down('chart[name=chartAksesDataMinggu]').getStore();
            store.loadData(generate);
            var storeList = me.getListAksesDataMingguan().getStore();
            storeList.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_MINGGU_TERAKHIR&INSTANSI=" + instansi;
            storeList.reload();
            
            var storeListSum = me.getListSummaryAksesDataMingguan().getStore();
            storeListSum.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_MINGGU_TERAKHIR_TOTAL&INSTANSI=" + instansi;
            storeListSum.reload();
        } else {
            var generate = me.generateData();
            var panel = me.getMainAksesDataMingguTerakhir().down('panel[name=aksesDataMingguPanel]');
            var store = panel.down('chart[name=chartAksesDataMinggu]').getStore();
            store.loadData(generate);
            var storeList = me.getListAksesDataMingguan().getStore();
            storeList.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_MINGGU_TERAKHIR";
            storeList.reload();
            
            var storeListSum = me.getListSummaryAksesDataMingguan().getStore();
            storeListSum.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_MINGGU_TERAKHIR_TOTAL";
            storeListSum.reload();
        }
    },
    refreshChart: function() {
        var me = this;
        me.getMainAksesDataMingguTerakhir().down("combo[action=instansiAksesMingguTerakhir]").clearValue();
        var generate = me.generateData();
        var panel = me.getMainAksesDataMingguTerakhir().down('panel[name=aksesDataMingguPanel]');
        var store = panel.down('chart[name=chartAksesDataMinggu]').getStore();
        store.loadData(generate);
        var storeList = me.getListAksesDataMingguan().getStore();
        storeList.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_MINGGU_TERAKHIR";
        storeList.reload();

        var storeListSum = me.getListSummaryAksesDataMingguan().getStore();
        storeListSum.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_MINGGU_TERAKHIR_TOTAL";
        storeListSum.reload();
    }
});