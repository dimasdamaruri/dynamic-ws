Ext.define('AdmindukWS.controller.LaporanTahunanController', {
    extend: 'Ext.app.Controller',
    views: [
        'AdmindukWS.view.Laporan.MainAksesDataTahunan',
        'AdmindukWS.view.Laporan.ListAksesDataTahunan'
    ],
    refs: [
        {
            ref: 'MainAksesDataTahunan',
            selector: 'MainAksesDataTahunan'
        },
        {
            ref: 'ListAksesDataTahunan',
            selector: 'ListAksesDataTahunan'
        }
    ],
    init: function() {
        this.control({
            'ListAksesDataTahunan button[action=exportExcel]': {
                click: this.exportExcel
            }
        });
    },
    exportExcel: function(){
        window.location.href = AdmindukWS.config.exportUrl + "/kode=GET_AKSES_TAHUNAN";
    }
});