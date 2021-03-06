Ext.define('AdmindukWS.controller.UserAktifPerInstansiController', {
    extend: 'Ext.app.Controller',
    views: [
        'AdmindukWS.view.UserAktifPerInstansi.MainUserAktifPerInstansi',
        'AdmindukWS.view.UserAktifPerInstansi.ListUserAktifPerinstansi'
    ],
    refs: [
        {
            ref: 'MainUserAktifPerInstansi',
            selector: 'MainUserAktifPerInstansi'
        }, {
            ref: 'ListUserAktifPerinstansi',
            selector: 'ListUserAktifPerinstansi'
        }
    ],
    requires: [
    ],
    init: function() {
        var me = this;

        this.control({
            
            'MainUserAktifPerInstansi': {
                afterrender: this.userAktifPerInstansiAfterrender
            },
            
            'MainUserAktifPerInstansi button[action=refresh]': {
                click: this.refreshChart
            }
        });
    },
    
    generateData: function() {
        var data= [];
        
        Ext.Ajax.request({
            async: false,
            url:AdmindukWS.config.servicePath + "/kode=GET_USER_INSTANSI_AKTIF",
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response, options) {
                console.log("--> response [", Ext.JSON.decode(response.responseText), "]");
                var objResponse = Ext.JSON.decode(response.responseText);
                var arrResponse = objResponse.content;

                for (var i=0; i<arrResponse.length; i++) {
                    data.push({
                        JUMLAH_DATA: arrResponse[i].JUMLAH_DATA,
                        NAMA_DATA: arrResponse[i].NAMA_DATA
                    });
                }
            },
            failure: function (response, options) {
                AdmindukWS.util.MessageBox.showMessageBoxDelete(response, options, 'Group');
            }
        });
        
        return data;
    },
    
    userAktifPerInstansiAfterrender: function() {
        
        var panel = this.getMainUserAktifPerInstansi().down('panel[name=userAktifPerInstansiPanel]');
        var me = this;
        var chartStore = Ext.create('Ext.data.JsonStore', {
                fields: ['JUMLAH_DATA', 'NAMA_DATA'],
                data: me.generateData(),
                autoLoad: true
            });
        panel.add({
            xtype: 'chart',
            name: 'chartUserAktifPerInstansi',
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: chartStore,
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
                    title: 'User'
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
        var panel = this.getMainUserAktifPerInstansi().down('panel[name=userAktifPerInstansiPanel]');
        var store = panel.down('chart[name=chartUserAktifPerInstansi]').getStore();
        store.loadData(generate);
        this.getListUserAktifPerinstansi().getStore().reload();
    }
});