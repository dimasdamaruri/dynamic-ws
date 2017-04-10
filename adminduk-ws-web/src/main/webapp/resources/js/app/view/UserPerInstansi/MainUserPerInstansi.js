Ext.define('AdmindukWS.view.UserPerInstansi.MainUserPerInstansi', {
    extend: 'Ext.container.Container',
    alias: 'widget.MainUserPerInstansi',
    title: 'User Per Instansi',
    //split: true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    requires: [
        'Ext.chart.*',
        'AdmindukWS.view.UserPerInstansi.ListUserPerInstansi'
    ],
    generateData: function() {
        return AdmindukWS.columnStatistikDataUserPerInstansi;
    },
    initComponent: function() {
        var me = this;
        Ext.apply(this, {
            items: [
                {
                    xtype: 'panel',
                    name: 'userPerInstansiPanel',
                    flex: 3,
//                    margin: '5 10 10 5',
                    padding: '5 0 0 5',
                    layout: 'fit'
                }, {
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
                            xtype: 'ListUserPerInstansi',
                            name: 'gridListUserPerInstansi'
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

