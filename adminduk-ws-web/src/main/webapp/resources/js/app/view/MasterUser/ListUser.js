var searchCombo = Ext.create('Ext.data.Store', {
    fields: ['kode', 'nama'],
    data: [
        {"kode": "1", "nama": "NIK"},
        {"kode": "2", "nama": "Instansi"},
        {"kode": "3", "nama": "User Pengguna"},
        {"kode": "4", "nama": "Nama User"}
    ]
});

Ext.define('AdmindukWS.view.MasterUser.ListUser', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ListUser',
    gridname: 'gridListUser',
    autoScroll: true,
    title: 'List',
    requires: [
        'AdmindukWS.model.MasterUser'
    ],
    initComponent: function () {
        var storeMsUser = Ext.create('Ext.data.Store', {
            model: 'AdmindukWS.model.MasterUser',
            proxy: {
                type: 'ajax',
                pageParam: 'page.page',
                url: AdmindukWS.config.servicePath + "/kode=GETDATA_LIST_USER",
                reader: {
                    type: 'json',
                    root: 'content',
                    totalProperty: 'totalElements'
                }
            },
            autoLoad: true
        });

        Ext.apply(this, {
            store: storeMsUser,
            columns: [
                {
                    xtype: 'rownumberer'
                    , width: 40
                },
                {
                    text: 'ID User',
                    flex: 1,
                    dataIndex: 'USER_ID'
                },
//                {
//                    text: 'IP Instansi Asal',
//                    flex: 1,
//                    dataIndex: 'IP_ADDRES'
//                },
                {
                    text: 'Nama User',
                    flex: 1,
                    dataIndex: 'USERNAME'
                },
                {
                    text: 'NIK',
                    flex: 1,
                    dataIndex: 'NIK'
                },
                {
                    text: 'NIP',
                    flex: 1,
                    dataIndex: 'NOPEG'
                },
                {
                    text: 'Jabatan',
                    flex: 1,
                    dataIndex: 'OCUPATION'
                },
                {
                    text: 'Instansi',
                    flex: 1,
                    dataIndex: 'NAMA_INSTANSI'
                },
                {
                    text: 'Propinsi',
                    flex: 1,
                    dataIndex: 'NAMA_PROP'
                },
                {
                    text: 'Kabupaten',
                    flex: 1,
                    dataIndex: 'KAB_NAME'
                },
                {
                    text: 'Keterangan',
                    flex: 1,
                    dataIndex: 'KETERANGAN'
                },
                {
                    text: 'Quota',
                    flex: 1,
                    dataIndex: 'KUOTA'
                },
                {
                    text: 'Status',
                    flex: 1,
                    dataIndex: 'AKTIF',
                    renderer: function (value) {
                        if (value == '1') {
                            return 'AKTIF';
                        } else if (value == '2') {
                            return 'NON AKTIF';
                        } else {
                            return '-';
                        }
                    }
                }
            ],
            tbar: [
                {
                    itemId: 'addUserState',
                    action: 'newUser',
                    text: 'Tambah User',
                    iconCls: 'fam-add'
                },
                {
                    itemId: 'editUserState',
                    action: 'editUser',
                    iconCls: 'fam-page-edit',
                    text: 'Edit',
                    disabled: true
                }, {
                    itemId: 'deleteUserState',
                    action: 'deleteUser',
                    iconCls: 'fam-page-delete',
                    text: 'Delete',
                    disabled: true
                }, {
                    xtype: 'tbspacer'
                }, {
                    xtype: 'combo',
                    width: 300,
                    name: 'SEARCH_USER',
                    store: searchCombo,
                    displayField: 'nama',
                    valueField: 'kode',
                    anchor: '30%',
                    editable: false,
                    emptyText: 'Cari Berdasarkan...'
                }, {
                    xtype: 'textfield',
                    name: 'search',
                    emptyText: 'Search ...'
                }, {
                    itemId: 'searchUserState',
                    action: 'searchUser',
                    iconCls: 'fam-find',
                    text: 'Search'
                }, {
                    itemId: 'clearSearchUserState',
                    action: 'clearSearchUser',
                    iconCls: 'fam-table-refresh',
                    text: 'Refresh'
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: storeMsUser,
                    displayInfo: true,
                    displayMsg: 'Displaying Data {0} - {1} of {2}',
                    emptyMsg: 'No Data to display'
                }
            ]
        });

        this.callParent(arguments);
    }

});
