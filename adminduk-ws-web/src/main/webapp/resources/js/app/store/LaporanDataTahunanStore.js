Ext.define('AdmindukWS.store.LaporanDataTahunanStore', {
    extend: 'AdmindukWS.store.BaseStore',
    model: 'AdmindukWS.model.LaporanDataTahunan',
    url: AdmindukWS.config.servicePath + "/kode=GET_AKSES_TAHUNAN",
//    url: "resources/data/laporan.json",
    pageSize: 25,
    autoScroll: true,
    remoteSort: true,
    groupField: 'TAHUN'
});