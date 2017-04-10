Ext.define('AdmindukWS.controller.PeringkatAksesController', {
    extend: 'Ext.app.Controller',
    views: [
        'AdmindukWS.view.AksesData.PeringkatAkses.ListPeringkatAkses',
        'AdmindukWS.view.AksesData.PeringkatAkses.MainPeringkatAkses'
    ],
    refs: [
        {
            ref: 'ListPeringkatAkses',
            selector: 'ListPeringkatAkses'
        }, {
            ref: 'MainPeringkatAkses',
            selector: 'MainPeringkatAkses'
        }
    ],
    requires: [
    ],
    init: function() {
        var me = this;

        this.control({
            'MainPeringkatAkses': {
                afterrender: this.peringkatAksesAfterrender
            },
            'MainPeringkatAkses button[action=refresh]': {
                click: this.refreshChart
            }

        });
    },
    generateData: function() {
        var data = [];

        Ext.Ajax.request({
            async: false,
            url: AdmindukWS.config.servicePath + "/kode=GET_PERINGKAT_AKSES",
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(response, options) {
                console.log("--> response [", Ext.JSON.decode(response.responseText), "]");
                var objResponse = Ext.JSON.decode(response.responseText);
                var arrResponse = objResponse.content;

                for (var i = 0; i < arrResponse.length; i++) {
                    console.log("--> PLTU is ", arrResponse[i].PLTU);
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

        return data;
    },
    peringkatAksesAfterrender: function() {
        var panel = this.getMainPeringkatAkses().down('panel[name=peringkatAksesPanel]');
        var me = this;
        var chartStore = Ext.create('Ext.data.JsonStore', {
            fields: ['JUMLAH_DATA', 'NAMA_DATA'],
            data: me.generateData(),
            autoLoad: true
        });
        panel.add({
            xtype: 'chart',
            name: 'chartPeringkatAkses',
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
                    title: 'Instansi'
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
        var generate = this.generateData();
        var panel = this.getMainPeringkatAkses().down('panel[name=peringkatAksesPanel]');
        var store = panel.down('chart[name=chartPeringkatAkses]').getStore();
        store.loadData(generate);
        this.getListPeringkatAkses().getStore().reload();
    }
});