Ext.define('AdmindukWS.view.HeaderMenu', {
    extend: 'Ext.Container',
    xtype: 'headerMenu',
    alias: 'widget.headerMenu',
    id: 'app-header-menu',
//    align: 'right',
//    style: 'float:right',
    layout: {
        type: 'hbox',
        pack: 'end'
    },
    requires: [
        'Ext.menu.*'
    ],
    initComponent: function() {
        this.items = [
            {
                xtype: 'toolbar',
                style: 'border:0px;border-color: transparent;background-image: none;background-color: transparent;',
                title: "Menu",
                defaults: {
                    xtype: 'splitbutton'
                },
                items: [
                    {xtype: 'tbfill'},
                    {
                        xtype: 'button',
                        width: 75,
                        iconCls: 'fam-house',
                        text: 'Menu',
//                        hidden:true,
                        menu: {
                            items: [
                                {
                                    text: 'Dashboard Chart',
                                    iconCls: 'fam-chart-curve',
                                    screenType: 'dashboard'
                                }, {
                                    text: 'Dashboard Data',
                                    iconCls: 'fam-application-view-list',
                                    screenType: 'GridDashboard'
                                }, {
                                    text: 'Instansi',
                                    menu: {
                                        items: [
                                            {
                                                text: "Instansi Pengguna",
                                                iconCls: 'fam-building',
                                                screenType: 'ListInstansiPengguna'
                                            },
                                            {
                                                text: "User Per Instansi",
                                                iconCls: 'fam-drive-user',
                                                screenType: 'MainUserPerInstansi'
                                            },
                                            {
                                                text: "User Aktif Per Instansi",
                                                iconCls: 'fam-folder-user',
                                                screenType: 'MainUserAktifPerInstansi'
                                            }
                                        ]
                                    }
                                }, {
                                    text: 'Akses Data',
                                    menu: {
                                        items: [
                                            {
                                                text: "Akses Data 1 Minggu Terakhir",
                                                iconCls: 'fam-calendar-view-week',
                                                screenType: 'MainAksesDataMingguTerakhir'
                                            },
                                            {
                                                text: "Akses Data 1 Bulan Terakhir",
                                                iconCls: 'fam-calendar-view-month',
                                                screenType: 'MainAksesDataBulanTerakhir'
                                            },
                                            {
                                                text: "Akses Data Per Bulan",
                                                iconCls: 'fam-calendar-view-day',
                                                screenType: 'MainAksesDataPerBulan'
                                            },
                                            {
                                                text: "Akses Data Per Status",
                                                iconCls: 'fam-textfield',
                                                screenType: 'MainAksesDataPerStatus'
                                            },
                                            {
                                                text: "Peringkat Akses",
                                                iconCls: 'fam-chart-bar',
                                                screenType: 'MainPeringkatAkses'
                                            }
                                        ]
                                    }
                                }, {
                                    text: 'Laporan',
                                    menu: {
                                        items: [
                                            {
                                                text: "Akses Data",
                                                iconCls: 'fam-report',
                                                screenType: 'MainAksesDataTahunan'
                                            }
                                        ]
                                    }
                                }, {
                                    text: 'Master',
                                    menu: {
                                        items: [
                                            {
                                                text: "Instansi",
                                                iconCls: 'fam-building-link',
                                                screenType: 'MainTabInstansi'
                                            },
                                            {
                                                text: "Metode",
                                                iconCls: 'fam-script-link',
                                                screenType: 'MainTabMethod'
                                            },
                                            {
                                                text: "User",
                                                iconCls: 'fam-group-link',
                                                screenType: 'MainTabUser'
                                            },
                                            {
                                                text: "WS Server",
                                                iconCls: 'fam-server-link',
                                                screenType: 'MainTabMasterUrl'
                                            },
                                            {
                                                text: "Parameter",
                                                iconCls: 'fam-server-link',
                                                screenType: 'MainTabMasterParameter'
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        xtype: 'button',
                        width: 150,
                        iconCls: 'fam-user',
                        text: AdmindukWS.util.SecurityHelper.checkUser(),
                        menu: {
                            items: [
                                {
                                    text: 'Change Password',
                                    iconCls: 'fam-keyboard'
                                },
                                {
                                    text: 'Logout',
                                    iconCls: 'fam-door-out',
                                    handler: function() {
                                        window.location.href = AdmindukWS.config.logoutUrl;
                                    }
                                }
                            ]
                        }
                    }
                ]
            }];
        this.callParent();
    }
});
