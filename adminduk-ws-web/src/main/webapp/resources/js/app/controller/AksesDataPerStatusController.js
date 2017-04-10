Ext.define('AdmindukWS.controller.AksesDataPerStatusController', {
    extend: 'Ext.app.Controller',
    views: [
        'AdmindukWS.view.AksesData.AksesDataPerStatus.ListAksesDataPerStatus',
        'AdmindukWS.view.AksesData.AksesDataPerStatus.MainAksesDataPerStatus',
        'AdmindukWS.view.AksesData.AksesDataPerStatus.ListSummaryAksesDataPerStatus'
    ],
    refs: [
        {
            ref: 'ListAksesDataPerStatus',
            selector: 'ListAksesDataPerStatus'
        }, {
            ref: 'MainAksesDataPerStatus',
            selector: 'MainAksesDataPerStatus'
        }
        , {
            ref: 'ListSummaryAksesDataPerStatus',
            selector: 'ListSummaryAksesDataPerStatus'
        }
    ],
    requires: [
    ],
    init: function() {
        var me = this;

        this.control({
            'MainAksesDataPerStatus': {
                afterrender: this.aksesDataPerStatusAfterrender
            },
            'MainAksesDataPerStatus button[action=refresh]': {
                click: this.refreshChart
            },
            'MainAksesDataPerStatus combo[action=instansiAksesPerStatus]': {
                select: this.instansiAksesPerStatus
            }
        });
    },
    instansiAksesPerStatus: function(grid, selection) {
        var me = this;
        if (selection[0].data) {
            me.comboRefreshChart(selection[0].data.NAMA_INSTANSI);
        }
    },
    generateData: function(instansi) {
        var data = [];

        if(!instansi) {
            Ext.Ajax.request({
                async: false,
                url: AdmindukWS.config.servicePath + "/kode=GET_PER_STATUS",
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
                url: AdmindukWS.config.servicePath + "/kode=GET_PER_STATUS&INSTANSI=" + instansi,
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
    aksesDataPerStatusAfterrender: function() {
        var panel = this.getMainAksesDataPerStatus().down('panel[name=aksesDataPerStatusPanel]');
        var me = this;
        var chartStore = Ext.create('Ext.data.JsonStore', {
            fields: ['JUMLAH_DATA', 'NAMA_DATA'],
            data: me.generateData(),
            autoLoad: true
        });
        panel.add({
            xtype: 'chart',
            name: 'chartAksesDataPerStatus',
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
                    title: 'Jumlah Data',
                    grid: true,
                    minimum: 0
                }, {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['NAMA_DATA'],
                    title: 'Status'
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
    refreshChart: function() {
        this.getMainAksesDataPerStatus().down("combo[action=instansiAksesPerStatus]").clearValue();
        
        var generate = this.generateData();
        var panel = this.getMainAksesDataPerStatus().down('panel[name=aksesDataPerStatusPanel]');
        var store = panel.down('chart[name=chartAksesDataPerStatus]').getStore();
        store.loadData(generate);

        var storeList = this.getListAksesDataPerStatus().getStore();
        storeList.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_PER_STATUS";
        storeList.reload();

        var storeListSum = this.getListSummaryAksesDataPerStatus().getStore();
        storeListSum.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_PER_STATUS_TOTAL";
        storeListSum.reload();
    },
    
    comboRefreshChart: function(instansi) {
        var me = this;
        if(instansi) {
            var generate = this.generateData(instansi);
            var panel = this.getMainAksesDataPerStatus().down('panel[name=aksesDataPerStatusPanel]');
            var store = panel.down('chart[name=chartAksesDataPerStatus]').getStore();
            store.loadData(generate);

            var storeList = this.getListAksesDataPerStatus().getStore();
            storeList.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_PER_STATUS&INSTANSI=" + instansi;
            storeList.reload();

            var storeListSum = this.getListSummaryAksesDataPerStatus().getStore();
            storeListSum.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_PER_STATUS_TOTAL&INSTANSI=" + instansi;
            storeListSum.reload();
        } else {
            var generate = this.generateData();
            var panel = this.getMainAksesDataPerStatus().down('panel[name=aksesDataPerStatusPanel]');
            var store = panel.down('chart[name=chartAksesDataPerStatus]').getStore();
            store.loadData(generate);

            var storeList = this.getListAksesDataPerStatus().getStore();
            storeList.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_PER_STATUS";
            storeList.reload();

            var storeListSum = this.getListSummaryAksesDataPerStatus().getStore();
            storeListSum.getProxy().url = AdmindukWS.config.servicePath + "/kode=GET_PER_STATUS_TOTAL";
            storeListSum.reload();
        }
    }
});