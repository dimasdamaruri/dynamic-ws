Ext.define('AdmindukWS.view.CenterTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.centerTabPanel',
    split: true,
    activeTab: 0,

    requires: [
//        'Coalsys.view.Dashboard',
        //'Coalsys.view.DashboardMap01',
//        'Ext.ux.GMapPanel'
    ],

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'dashboard',
                    tabConfig: {
                        xtype: 'tab',
                        closable: true
                    }
                },
                {
                    xtype: 'GridDashboard',
                    tabConfig: {
                        xtype: 'tab',
                        closable: true
                    }
                }
                /*
                {
                    xtype: 'dashboardMap01',
                    tabConfig: {
                        xtype: 'tab',
                        closable: true
                    }
                },*/
            ]
        });

        me.callParent(arguments);
    },


    displayScreen: function (screenType, data) {
        var self = this;
        var screen = self.child(screenType);
        if (screen) {
            if (data) {
                screen.initialComboValue = data;
                if (Ext.isFunction(screen.getComboStore)) {
                    screen.getComboStore().load(function () {
                        if (Ext.isFunction(screen.setMainComboValue)) {
                            screen.setMainComboValue();
                        }
                    });
                }
            }
            self.setActiveTab(screen);
        } else {
            //console.log('--> displayScreen no data');
            this.add({
                xtype: screenType,
                tabConfig: {
                    xtype: 'tab',
                    closable: true
                }
            });
            screen = self.child(screenType);
            if (data) {
                screen.initialComboValue = data;
                //screen.arrMarkers = data;
                if (Ext.isFunction(screen.getComboStore)) {
                    screen.getComboStore().load(function () {
                        if (Ext.isFunction(screen.setMainComboValue)) {
                            screen.setMainComboValue();
                        }
                    });
                }
            } else {
                console.log('screen.initDashboard -> ', Ext.isFunction(screen.initDashboard));

                if (Ext.isFunction(screen.initDashboard)) {
                    screen.initDashboard();
                }

            }
            self.setActiveTab(screen);
        }
    }

});