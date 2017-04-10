Ext.define('AdmindukWS.controller.AksesDataPerBulanController', {
    extend: 'Ext.app.Controller',
    views: [
        'AdmindukWS.view.AksesData.AksesDataPerBulan.MainAksesDataPerBulan',
        'AdmindukWS.view.AksesData.AksesDataPerBulan.ListAksesDataPerBulan',
        'AdmindukWS.view.AksesData.AksesDataPerBulan.ListSummaryAksesDataPerBulan',
    ],
    refs: [
        {
            ref: 'MainAksesDataPerBulan',
            selector: 'MainAksesDataPerBulan'
        }, {
            ref: 'ListAksesDataPerBulan',
            selector: 'ListAksesDataPerBulan'
        },
        {
            ref: 'ListSummaryAksesDataPerBulan',
            selector: 'ListSummaryAksesDataPerBulan'
        }
    ],
    requires: [
    ],
    init: function() {
        var me = this;

        this.control({
            'MainAksesDataPerBulan': {
                afterrender: this.aksesDataPerBulanAfterrender
            },
            'MainAksesDataPerBulan button[action=refresh]': {
                click: this.refreshChart
            },
            'MainAksesDataPerBulan combo[action=instansiAksesPerBulan]': {
                select: this.instansiAksesPerBulan
            }
        });
    },
    instansiAksesPerBulan: function(grid, selection) {
        var me = this;
        if (selection[0].data) {
            me.comboRefreshChart(selection[0].data.NAMA_INSTANSI);
        }
    },
    generateData: function(instansi) {
        // data for pie chart
        var data = [];
        
        if(!instansi) {
            Ext.Ajax.request({
                async: false,
                url: AdmindukWS.config.servicePath + "/kode=GET_PER_BULAN",
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
                url: AdmindukWS.config.servicePath + "/kode=GET_PER_BULAN&INSTANSI=" + instansi,
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
    aksesDataPerBulanAfterrender: function() {
        var panel = this.getMainAksesDataPerBulan().down('panel[name=aksesDataPerBulanPanel]');
        var me = this;
        var chartStore = Ext.create('Ext.data.JsonStore', {
            fields: ['JUMLAH_DATA', 'NAMA_DATA'],
            data: me.generateData(),
            autoLoad: true
        });
        panel.add({
            xtype: 'chart',
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: chartStore,
            name: 'chartAksesDatePerbulan',
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
                    title: 'Bulan'
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
                    },
                }]

        });
    },
    refreshChart: function() {
        this.getMainAksesDataPerBulan().down("combo[action=instansiAksesPerBulan]").clearValue();
        
        var generate = this.generateData();
        var panel = this.getMainAksesDataPerBulan().down('panel[name=aksesDataPerBulanPanel]');
        var store = panel.down('chart[name=chartAksesDatePerbulan]').getStore();
        store.loadData(generate);
        
        var storeList = this.getListAksesDataPerBulan().getStore();
        storeList.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_PER_BULAN";
        storeList.reload();

        var storeListSum = this.getListSummaryAksesDataPerBulan().getStore();
        storeListSum.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_PER_BULAN_TOTAL";
        storeListSum.reload();
    },
    comboRefreshChart: function(instansi) {
        var me = this;
        if(instansi) {
            var generate = me.generateData(instansi);
            var panel = me.getMainAksesDataPerBulan().down('panel[name=aksesDataPerBulanPanel]');
            var store = panel.down('chart[name=chartAksesDatePerbulan]').getStore();
            store.loadData(generate);
            var storeList = me.getListAksesDataPerBulan().getStore();
            storeList.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_PER_BULAN&INSTANSI=" + instansi;
            storeList.reload();

            var storeListSum = me.getListSummaryAksesDataPerBulan().getStore();
            storeListSum.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_PER_BULAN_TOTAL&INSTANSI=" + instansi;
            storeListSum.reload();
        } else {
            var generate = me.generateData();
            var panel = me.getMainAksesDataPerBulan().down('panel[name=aksesDataPerBulanPanel]');
            var store = panel.down('chart[name=chartAksesDatePerbulan]').getStore();
            store.loadData(generate);
            var storeList = me.getListAksesDataBulanTerakhir().getStore();
            storeList.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_BULAN_TERAKHIR";
            storeList.reload();

            var storeListSum = me.getListSummaryAksesDataBulanan().getStore();
            storeListSum.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_BULAN_TERAKHIR_TOTAL";
            storeListSum.reload();
        }
    }
});