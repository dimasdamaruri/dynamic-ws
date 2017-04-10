Ext.define('AdmindukWS.model.LaporanDataTahunan', {
    extend: 'AdmindukWS.model.Base',

    fields: [
        {
            name: 'TAHUN',
            type: 'string'
        },
        {
            name: 'NAMA_DATA',
            type: 'string'
        },
        {
            name: 'JUMLAH_DATA',
            type: 'float'
        }
    ]
});