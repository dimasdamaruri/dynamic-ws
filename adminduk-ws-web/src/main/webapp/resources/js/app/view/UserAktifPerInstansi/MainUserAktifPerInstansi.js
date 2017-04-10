Ext.define('AdmindukWS.view.UserAktifPerInstansi.MainUserAktifPerInstansi', {
    extend: 'Ext.container.Container',
    alias: 'widget.MainUserAktifPerInstansi',
    title: 'User Aktif Per Instansi',
    //split: true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    requires: [
        'Ext.chart.*',
        'AdmindukWS.view.UserAktifPerInstansi.ListUserAktifPerinstansi'
    ],
    generateData: function() {
        return AdmindukWS.columnStatistikDataUserAktifPerInstansi;
    },
    initComponent: function() {
        var me = this;
        Ext.apply(this, {
            items: [
                {
                    xtype: 'panel',
                    name: 'userAktifPerInstansiPanel',
                    flex: 3,
//                    margin: '5 10 10 5',
                    padding: '5 0 0 5',
                    layout: 'fit'
                },{
                    xtype: 'container',
                    frame: true,
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        padding: '2'
                    },
                    items: [
                        {
                            flex: 1,
                            xtype: 'ListUserAktifPerinstansi',
                            name: 'gridListUserAktifPerinstansi'
                        }
                    ]
                }
            ],    
            tbar: [
                {
                    itemId: 'chartRefresh',
                    action : 'refresh',
                    text: 'Refresh',
                    iconCls: 'fam-arrow-refresh'
                }
            ]
        });

        this.addListener({
            beforeclose: {
                fn: this.onClose,
                scope: this
            }
        });
        this.callParent(arguments);
    },
    onClose: function(p) {
        Ext.MessageBox.show({
            title: 'Question.',
            msg: 'Do you want to close this window ?',
            buttons: Ext.MessageBox.YESNO,
            fn: function(buttonId) {
                switch (buttonId) {
                    case 'no':
                        break;
                    case 'yes':
                        this.ownerCt.remove(p);
                        break;
                }
            },
            scope: this
        });
        return false;  // returning false to beforeclose cancels the close event
    }
});


