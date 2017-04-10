Ext.define('AdmindukWS.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    layout: {
        type: 'border'
//        padding: '3 3 3 3'
    },
    requires: [
        'AdmindukWS.view.Header',
        'AdmindukWS.view.HeaderMenu',
        'AdmindukWS.view.CenterTabPanel',
        'AdmindukWS.view.Dashboard',
        'AdmindukWS.view.GridDashboard',
        'AdmindukWS.view.Instansi.MainTabInstansi',
        'AdmindukWS.view.Method.MainTabMethod',
        'AdmindukWS.view.MasterUser.MainTabUser',
        'AdmindukWS.view.MasterUrl.MainTabMasterUrl',
        'AdmindukWS.view.MasterParameter.MainTabMasterParameter',
        'AdmindukWS.view.InstansiPengguna.ListInstansiPengguna',
        'AdmindukWS.view.UserAktifPerInstansi.MainUserAktifPerInstansi',
        'AdmindukWS.view.UserPerInstansi.MainUserPerInstansi',
        'AdmindukWS.view.AksesData.aksesDataMingguTerakhir.MainAksesDataMingguTerakhir',
        'AdmindukWS.view.AksesData.AksesDataBulanTerakhir.MainAksesDataBulanTerakhir',
        'AdmindukWS.view.AksesData.AksesDataPerBulan.MainAksesDataPerBulan',
        'AdmindukWS.view.AksesData.PeringkatAkses.MainPeringkatAkses',
        'AdmindukWS.view.Laporan.MainAksesDataTahunan',
        'AdmindukWS.view.AksesData.AksesDataPerStatus.MainAksesDataPerStatus'
    ],
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    region: 'north',
                    xtype: 'appHeader'
//                    margin: '0 0 0 0',
//                    height: 75,
//                    width: '100%',
//                    layout: 'vbox',
//                    items: [
//                        {
//                            xtype: 'panel',
//                            html: '<div align="left" style="background-color: #b0c4de;"></div>'
//                        }
//                    ]
                },
//                {
//                xtype: 'container',
//                        frame: true,
//                        margin: '0 0 3 0',
//                        region: 'north',
//                        height: 100,
//                        layout: 'border',
//                        items: [
//                        {
//                        xtype: 'panel',
//                                frame: true,
//                                margin: '3 3 3 3',
//                                region: 'west',
//                                width: 100,
//                                html: '<div align="left" ><img style="height: 90px; width: 90px" src="' + AdmindukWS.config.resourcesPath + 'img/logo3.jpg" / > ' +
//                                '</div>'
//                        },
//                        {
//                        xtype: 'tabpanel',
//                                id: 'menutabpanel',
//                                region: 'center',
//                                frame: true,
//                                items: [
//                                {    //Dashboard
//                                xtype: 'toolbar',
//                                        iconCls: 'fam-application-view-tile',
//                                        title: "Instansi Pengguna",
//                                        tabConfig: {
//                                        xtype: 'tab'
//                                        },
//                                        defaults: {
//                                        iconAlign: 'top',
//                                                scale: 'large',
//                                                xtype: 'button',
//                                                minWidth: 75
//                                        },
//                                        items: [
//                                        {
//                                        text: "Instansi Pengguna",
//                                                iconCls: 'icon-lihat',
//                                                screenType: 'ListInstansiPengguna'
//                                        },
//                                        {
//                                        text: "User Per Instansi",
//                                                iconCls: 'icon-lihat',
//                                                screenType: 'MainUserPerInstansi'
//                                        },
//                                        {
//                                        text: "User Aktif Per Instansi",
//                                                iconCls: 'icon-lihat',
//                                                screenType: 'MainUserAktifPerInstansi'
//                                        }
//                                        ]
//                                },
//                                {    //Dashboard
//                                xtype: 'toolbar',
//                                        iconCls: 'fam-application-view-tile',
//                                        title: "Akses Data",
//                                        tabConfig: {
//                                        xtype: 'tab'
//                                        },
//                                        defaults: {
//                                        iconAlign: 'top',
//                                                scale: 'large',
//                                                xtype: 'button',
//                                                minWidth: 75
//                                        },
//                                        items: [
//                                        {
//                                        text: "Akses Data 1 Minggu Terakhir",
//                                                iconCls: 'icon-lihat',
//                                                screenType: 'MainAksesDataMingguTerakhir'
//                                        },
//                                        {
//                                        text: "Akses Data 1 Bulan Terakhir",
//                                                iconCls: 'icon-lihat',
//                                                screenType: 'MainAksesDataBulanTerakhir'
//                                        },
//                                        {
//                                        text: "Akses Data Per Bulan",
//                                                iconCls: 'icon-lihat',
//                                                screenType: 'MainAksesDataPerBulan'
//                                        },
//                                        {
//                                        text: "Akses Data Per Status",
//                                                iconCls: 'icon-lihat',
//                                                screenType: 'MainAksesDataPerStatus'
//                                        },
//                                        {
//                                        text: "Peringkat Akses",
//                                                iconCls: 'icon-lihat',
//                                                screenType: 'MainPeringkatAkses'
//                                        }
//                                        ]
//                                },
//                                {    //Dashboard
//                                xtype: 'toolbar',
//                                        iconCls: 'fam-application-view-tile',
//                                        title: "Laporan",
//                                        tabConfig: {
//                                        xtype: 'tab'
//                                        },
//                                        defaults: {
//                                        iconAlign: 'top',
//                                                scale: 'large',
//                                                xtype: 'button',
//                                                minWidth: 75
//                                        },
//                                        items: [
//                                        {
//                                        text: "Akses Data",
//                                                iconCls: 'icon-lihat',
//                                                screenType: 'MainAksesDataTahunan'
//                                        }
//
//                                        ]
//                                },
//                                {    //Dashboard
//                                xtype: 'toolbar',
//                                        iconCls: 'fam-application-view-tile',
//                                        title: "Master",
//                                        tabConfig: {
//                                        xtype: 'tab'
//                                        },
//                                        defaults: {
//                                        iconAlign: 'top',
//                                                scale: 'large',
//                                                xtype: 'button',
//                                                minWidth: 75
//                                        },
//                                        items: [
//                                        {
//                                        text: "Instansi",
//                                                iconCls: 'icon-lihat',
//                                                screenType: 'MainTabInstansi'
//                                        },
//                                        {
//                                        text: "Metode",
//                                                iconCls: 'icon-lihat',
//                                                screenType: 'MainTabMethod'
//                                        },
//                                        {
//                                        text: "User",
//                                                iconCls: 'icon-lihat',
//                                                screenType: 'MainTabUser'
//                                        },
//                                        {
//                                        text: "WS Server",
//                                                iconCls: 'icon-lihat',
//                                                screenType: 'MainTabMasterUrl'
//                                        }
//                                        ]
//                                }
//                                ]
//                        },
//                        {
//                        xtype: 'button',
//                                margin: '3 3 3 0',
//                                region: 'east',
//                                scale: 'large',
//                                width: 150,
//                                //iconAlign: 'top',
//                                text: AdmindukWS.util.SecurityHelper.checkUser(),
//                                arrowAlign: 'bottom',
//                                menu: {
//                                items: [
//                                {
//                                text: 'Change Password',
//                                        iconCls: 'fam-keyboard'
//                                },
//                                {
//                                text: 'Logout',
//                                        iconCls: 'fam-door-out',
//                                        handler:function(){
//                                        window.location.href = AdmindukWS.config.logoutUrl;
//                                        }
//                                }
//                                ]
//                                }
//                        }
//
//                        ]
//                },
                {
                    split: true,
//                        frame: true,
                    xtype: 'panel',
                    region: 'center',
                    layout: 'border',
                    items: [
                        /*{
                         xtype:'tabpanel',
                         region:'center',
                         activeTab: 0,
                         items: [
                         {
                         title: 'Tab 1',
                         bodyPadding: 10,
                         html : 'A simple tab'
                         },
                         {
                         xtype:'latihangrid',
                         tabConfig:{
                         xtype:'tab',
                         closable:true
                         }
                         }
                         ]
                         },*/
                        {
                            xtype: 'centerTabPanel',
                            region: 'center'
                        }
                    ]
                }


            ]
        });
        me.callParent(arguments);
    }

});