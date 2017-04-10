Ext.Loader.setConfig({
    enabled: 'true',
    disableCaching:false
});
Ext.Loader.setPath('Ext.ux', AdmindukWS.config.loaderPath);

Ext.Ajax.request({
    url: AdmindukWS.config.loggedUserUrl,
    success: function (response) {
        var user = Ext.JSON.decode(response.responseText);

        AdmindukWS.util.SecurityHelper.initialize(user);

        Ext.application({
            name: 'AdmindukWS',
            appFolder: AdmindukWS.config.appFolder,
            requires: [
                "AdmindukWS.util.SecurityHelper",
                "AdmindukWS.util.MessageBox",
                'AdmindukWS.util.AppHelper',
                "Ext.form.*"
            ],

            models:[
                'AdmindukWS.model.Parameter',
                'AdmindukWS.model.Method',
                'AdmindukWS.model.MasterUser',
                'AdmindukWS.model.MasterUrl',
                'AdmindukWS.model.SummaryAksesData',
                'AdmindukWS.model.AksesData'
            ],

            stores: [
                'InstansiStore',
                'GridMethodParamStore',
                'GridDashboardStore',
                'LaporanDataTahunanStore',
                'DashboardStore'
            ],

            controllers: [     
                'Main',
                'AdmindukWS.controller.MethodController',
                'AdmindukWS.controller.InstansiController',
                'AdmindukWS.controller.MasterUserController',
                'AdmindukWS.controller.MasterUrlController',
                'AdmindukWS.controller.MasterParameterController',
                'AdmindukWS.controller.UserPerInstansiController',
                'AdmindukWS.controller.UserAktifPerInstansiController',
                'AdmindukWS.controller.AksesDataBulananController',
                'AdmindukWS.controller.AksesDataMingguanController',
                'AdmindukWS.controller.PeringkatAksesController',
                'AdmindukWS.controller.AksesDataPerBulanController',
                'AdmindukWS.controller.AksesDataPerStatusController',
                'AdmindukWS.controller.LaporanTahunanController'
            ],

            launch: function () {
                Ext.util.Format.thousandSeparator = '.';

                var timeTest = /^([1-9]|1[0-9]):([0-5][0-9])(\s[a|p]m)$/i;

                // custom vtype for dateRange
                // Add the additional 'advanced' VTypes
                Ext.apply(Ext.form.field.VTypes, {
                    password: function(val, field) {
                        if (field.initialPassField) {
                            var pwd = field.up('form').down('#' + field.initialPassField);
                            return (val == pwd.getValue());
                        }
                        return true;
                    }
                });
                
                var loadingObj = document.getElementById("loading");
                document.body.removeChild(loadingObj);
                Ext.create('AdmindukWS.view.Viewport');
            }
        });

    }
});
