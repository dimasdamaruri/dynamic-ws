Ext.define('AdmindukWS.controller.Main', {
    extend: 'Ext.app.Controller',
    views: ['Viewport', 'CenterTabPanel', 'Dashboard', 'HeaderMenu'],
    stores: ["LoggedUser"],
    refs: [
        {
            ref: 'treepanel',
            selector: 'treepanel'
        },
        {
            ref: 'centerTabPanel',
            selector: 'centerTabPanel'
        },
        {
            ref: 'headerMenu',
            selector: 'headerMenu'
        },
        {
            ref: 'loggedUserName',
            selector: '#loggedUserName'
        },
        {
            ref: 'menuTabPanel',
            selector: 'viewport #menutabpanel'
        },
        {
            ref: "petaRisikoDataMatrixDashboard",
            selector: 'dashboard petaRisikoDataMatrixDashboard'
        },
        {
            ref: "stockPileMapPanel",
            selector: 'dashboard advancedmappanel'
        },
        {
            ref: "dashboard",
            selector: 'dashboard'
        },
        {
            ref: "GridDashboard",
            selector: 'GridDashboard'
        }
    ],
    requires: [
    ],
    clockRunner: null,
    dashboardDataRunner: null,
    dashboardChartRunner: null,
    mingguChartRunner: null,
    init: function() {
        this.control({
            'viewport #menutabpanel': {
                afterrender: this.menuTabPanelAfterRender
            },
            'headerMenu toolbar button menuitem': {
                click: this.menuButtonClick
            },
            'dashboard': {
                afterrender: this.dashboardAfterRender,
                close: this.dashboardClose
            },
            'GridDashboard': {
                afterrender: this.gridDashboardAfterRender,
                close: this.gridDashboardClose
            }
        });
    },
    gridDashboardAfterRender: function() {
        var me = this;
        this.dashboardDataRunner = setInterval(function() {
            me.getGridDashboard().getStore().reload();
        }, 10000);

    },
    gridDashboardClose: function() {
        if (!this.dashboardDataRunner !== null) {
            clearInterval(this.dashboardDataRunner);
        }
    },
    dashboardClose: function() {
        if (this.clockRunner !== null) {
            clearInterval(this.clockRunner);
        }

        if (!this.dashboardChartRunner !== null) {
            clearInterval(this.dashboardChartRunner);
        }
    },
    menuTabPanelAfterRender: function(cmp) {
        var self = this;
        var toolbars = cmp.query("toolbar");
        Ext.each(toolbars, function(item) {
            var buttonParents = item.query("button[parentMenu=true]");
            Ext.each(buttonParents, function(buttonParent) {
                if (buttonParent.menu) {
                    var menuItems = buttonParent.menu.query("menuitem[hidden=false]");
                    if (menuItems.length == 0) {
                        item.remove(buttonParent);
                    }
                }
            });
            var buttons = item.query("button[hidden=false]");
            if (buttons.length == 0) {
                self.getMenuTabPanel().remove(item);
            }
        });
    },
    dashboardAfterRender: function() {
        var form = this.getDashboard().down('container[name=chartContainer]');
        var me = this;
        var dashboardStore = Ext.data.StoreManager.lookup("DashboardStore");
        
        //Render Dashboard Chart di timeout dulu, 
        //agar tidak balapan sama load dashboard store
        setTimeout(function(){
            dashboardStore.each(function(record) {
                form.add({
                    xtype: 'panel',
                    frame: true,
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    margin: '3 3 3 3',
                    padding: '3 5 5 5',
                    items: [
                        {
                            xtype: 'label',
                            style: 'font: bold 13px Arial',
                            html: record.get('INSTANSI_NEW')
                        },
                        {
                            xtype: 'label',
                            style: 'font: bold 24px Arial',
                            id: 'label' + record.get('INSTANSI'),
                            padding: '5 0 0 0',
                            text: record.get('JUMLAH_DATA') ? record.get('JUMLAH_DATA') : "0"
                        }
                    ]
                });
            });
        }, 500);
        
        this.dashboardChartRunner = setInterval(function() {
            dashboardStore.reload();
            dashboardStore.each(function(record) {
                if(Ext.getCmp('label' + record.get('INSTANSI'))) {
                    Ext.getCmp('label' + record.get('INSTANSI')).setText(record.get('JUMLAH_DATA') ? record.get('JUMLAH_DATA') : "0");
                }
            });

        }, 10000);

        this.clockRunner = setInterval(function() {
            Ext.getCmp('labelClock').setText(Ext.Date.format(new Date(), 'd M Y H:i:s')+ " WIB");
        }, 1000);

        this.loadMingguTerakhir();
        this.loadPeringkatAkses();
    },
    generateDataMingguTerakhir: function() {
        var data = [];
        Ext.Ajax.request({
            async: false,
            url: AdmindukWS.config.servicePath + "/kode=GET_MINGGU_TERAKHIR",
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(response, options) {
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
        return data;
    },
    loadMingguTerakhir: function() {
        var panel = this.getDashboard().down('panel[name=dashboardAksesDataMingguPanel]');
        var me = this;
        var chartStore = Ext.create('Ext.data.JsonStore', {
            fields: ['JUMLAH_DATA', 'NAMA_DATA'],
            data: me.generateDataMingguTerakhir(),
            autoLoad: true
        });
        panel.add({
            xtype: 'chart',
            name: 'dashboardChartAksesDataMinggu',
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
                    labelTitle: {font: 'bold 11px Arial'},
                    title: 'Jumlah Akses',
                    grid: true,
                    minimum: 0
                }, {
                    type: 'Category',
                    position: 'bottom',
                    labelTitle: {font: 'bold 11px Arial'},
                    fields: ['NAMA_DATA'],
                    title: 'Tanggal'
                }],
            series: [{
                    type: 'line',
                    highlight: {
                        size: 7,
                        radius: 7
                    },
                    axis: 'left',
                    fill: true,
                    xField: 'NAMA_DATA',
                    yField: 'JUMLAH_DATA',
                    markerConfig: {
                        type: 'circle',
                        size: 4,
                        radius: 4,
                        'stroke-width': 0
                    },
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
    generateDataPeringkatAkses: function() {
        var data = [];
        Ext.Ajax.request({
            async: false,
            url: AdmindukWS.config.servicePath + "/kode=GET_PERINGKAT_AKSES",
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(response, options) {
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
        return data;
    },
    loadPeringkatAkses: function() {
        var panel = this.getDashboard().down('panel[name=dashboardPeringkatAksesPanel]');
        var me = this;
        var chartStore = Ext.create('Ext.data.JsonStore', {
            fields: ['JUMLAH_DATA', 'NAMA_DATA'],
            data: me.generateDataPeringkatAkses(),
            autoLoad: true
        });
        panel.add({
            xtype: 'chart',
            name: 'dashboardChartPeringkatAkses',
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
                    labelTitle: {font: 'bold 11px Arial'},
                    grid: true,
                    minimum: 0
                }, {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['NAMA_DATA'],
                    labelTitle: {font: 'bold 11px Arial'},
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
                    },
                    label: {
                        display: 'insideEnd',
                        field: 'JUMLAH_DATA',
                        renderer: Ext.util.Format.numberRenderer('0'),
                        orientation: 'horizontal',
                        color: '#333',
                        'text-anchor': 'middle'
                    }
                }]
        });
    },
//    generateDataPerStatus: function() {
//        var data = [];
//        Ext.Ajax.request({
//            async: false,
//            url: AdmindukWS.config.servicePath + "/kode=GET_PER_STATUS",
//            method: 'GET',
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            success: function(response, options) {
//                var objResponse = Ext.JSON.decode(response.responseText);
//                var arrResponse = objResponse.content;
//                for (var i = 0; i < arrResponse.length; i++) {
//                    data.push({
//                        JUMLAH_DATA: arrResponse[i].JUMLAH_DATA,
//                        NAMA_DATA: arrResponse[i].NAMA_DATA
//                    });
//                }
//            },
//            failure: function(response, options) {
//                AdmindukWS.util.MessageBox.showMessageBoxDelete(response, options, 'Group');
//            }
//        });
//        return data;
//    },
//    loadPerStatus: function() {
//        var panel = this.getDashboard().down('panel[name=dashboardAksesDataPerStatusPanel]');
//        var me = this;
//        var chartStore = Ext.create('Ext.data.JsonStore', {
//            fields: ['JUMLAH_DATA', 'NAMA_DATA'],
//            data: me.generateDataPerStatus(),
//            autoLoad: true
//        });
//        panel.add({
//            xtype: 'chart',
//            name: 'dashboardChartAksesDataPerStatus',
//            style: 'background:#fff',
//            animate: true,
//            shadow: true,
//            store: chartStore,
//            legend: {
//                position: 'right'
//            },
//            theme: 'Base:gradients',
//            series: [{
//                type: 'pie',
//                field: 'JUMLAH_DATA',
//                showInLegend: true,
//                donut: false,
//                label: {
////                        display: 'insideEnd',
////                        'text-anchor': 'middle',
//                    field: 'NAMA_DATA'
////                        renderer: Ext.util.Format.numberRenderer('0'),
////                        orientation: 'vertical',
////                        color: '#333'
//                },
//                tips: {
//                    trackMouse: true,
//                    width: 140,
//                    height: 28,
//                    renderer: function(storeItem, item) {
//                        //calculate percentage.
//                        var total = 0;
//                        chartStore.each(function(rec) {
//                            total += rec.get('JUMLAH_DATA');
//                        });
//                        this.setTitle(storeItem.get('NAMA_DATA') + ': ' + Math.round(storeItem.get('JUMLAH_DATA') / total * 100) + '%');
//                    }
//                },
//                highlight: {
//                    segment: {
//                        margin: 20
//                    }
//                }
//            }]
//        });
//    },
    menuButtonClick: function(btn, evt) {
        if (btn && !Ext.isEmpty(btn.screenType)) {
            if (btn.widget) {
                Ext.widget(btn.screenType);
            } else {
                var data = {
                    data1: 'data1',
                    data2: 'data2'
                }

                this.getCenterTabPanel().displayScreen(btn.screenType);
            }
        }
    },
    initData: function(screenType) {
        Ext.widget(screenType);
    }

});