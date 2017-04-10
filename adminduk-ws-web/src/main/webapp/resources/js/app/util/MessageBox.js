/**
 * Created with IntelliJ IDEA.
 * User: Latief
 * Date: 9/11/12
 * Time: 8:45 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AdmindukWS.util.MessageBox', {
    singleton: true,

    showMessageBoxInfo: function (msg) {
        Ext.Msg.show({
            title: 'Info',
            modal: true,
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO
        });
    },

    showMessageBoxFind: function (response, options, objectMsg) {
        var title = '';
        var msg = '';
        var icon = '';
        if (response.status == 0) {
            title = 'Error Status 0';
            msg = 'Cannot Connect to Server!';
            icon = Ext.MessageBox.ERROR;
        } else if (response.status == 200) {  //OK
            title = 'Sukses';
            msg = 'Sukses mencari ' + objectMsg + '!';
            icon = Ext.MessageBox.INFO;
        } else if (response.status == 404) {  //NOT FOUND
            title = 'Info Status 404';
            msg = objectMsg + ' tidak ditemukan!';
            icon = Ext.MessageBox.INFO;
        } else {
            title = 'Error Status ' + response.status;
            msg = response.statusText;
            icon = Ext.MessageBox.ERROR;
        }
        Ext.Msg.show({
            title: title,
            modal: true,
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: icon
        });
    },

    showMessageBoxDelete: function (response, options, objectMsg) {
        var title = '';
        var msg = '';
        var icon = '';
        if (response.status == 0) {
            title = 'Error Status 0';
            msg = 'Cannot Connect to Server!';
            icon = Ext.MessageBox.ERROR;
        } else if (response.status == 200) {  //OK
            title = 'Success';
            msg = 'Sukses menghapus ' + objectMsg + '!';
            icon = Ext.MessageBox.INFO;
        } else {
            title = 'Error Status ' + response.status;
            msg = response.statusText;
            icon = Ext.MessageBox.ERROR;
        }
        Ext.Msg.show({
            title: title,
            modal: true,
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: icon
        });
    },


            showMessageBoxPostPut: function (response, options, objectMsg) {
        var title = '';
        var msg = '';
        var icon = '';
        if (response.status == 0) {
            title = 'Error Status 0';
            msg = 'Cannot Connect to Server!';
            icon = Ext.MessageBox.ERROR;
        } else if (response.status == 200) { //OK
            title = 'Success';
            msg = 'Perubahan ' + objectMsg + ' sukses!';
            icon = Ext.MessageBox.INFO;
        } else if (response.status == 201) { //CREATED
            title = 'Success';
            msg = 'Penambahan ' + objectMsg + ' sukses!';
            icon = Ext.MessageBox.INFO;
        } else {
            title = 'Error Status ' + response.status;
            msg = response.statusText;
            icon = Ext.MessageBox.ERROR;
        }
        Ext.Msg.show({
            title: title,
            modal: true,
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: icon
        });
    }
});