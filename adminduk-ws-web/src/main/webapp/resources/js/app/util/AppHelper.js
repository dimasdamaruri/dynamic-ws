/**
 * Created with IntelliJ IDEA.
 * User: rezafit
 * Date: 5/14/13
 * Time: 11:57 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('AdmindukWS.util.AppHelper', {
    singleton: true,

    createBLTH: function () {
        var currentDate = new Date();
        return  Ext.Date.format(currentDate, 'Ym');
    },

    createBLTHBulanLalu: function () {

        var currentDate = new Date();
        var blth = '';

        var currentMonth = parseInt(Ext.Date.format(currentDate, 'm'));
        var currentYear = parseInt(Ext.Date.format(currentDate, 'Y'));

        var prevMonth = currentMonth - 1;
        if (prevMonth < 1) {
            currentYear = currentYear - 1;
            blth = currentYear + '12';
        } else {
            blth = currentYear + '' + this.twoDigitMonth(prevMonth);
        }

        console.log('-> createBLTHBulanLalu', blth);
        return blth;
    },

    createBLTHBulanLaluByParameter: function (blth) {

        var paramDate = Ext.Date.parse(blth, "Ym");

        var currentMonth = parseInt(Ext.Date.format(paramDate, 'm'));
        var currentYear = parseInt(Ext.Date.format(paramDate, 'Y'));

        var prevMonth = currentMonth - 1;
        if (prevMonth < 1) {
            currentYear = currentYear - 1;
            blth = currentYear + '12';
        } else {
            blth = currentYear + '' + this.twoDigitMonth(prevMonth);
        }
        return blth;
    },

    convertBLTHToString: function (blth) {
        return  Ext.Date.format(Ext.Date.parse(blth, "Ym"), 'F Y');
    },

    convertJenisKontrakToCode: function (obj) {
        var retValue = '';

        if (typeof obj === 'string') {
            retValue = obj;
        } else {
            if(obj===undefined){
                console.info('-->obj', 'undefined');
                retValue = '-1';
            }else{
                console.info('-->obj', obj);
                retValue = '3';
            }

        }
        return retValue;
    },


    convertJenisTransportToCode: function (obj) {
        if (Ext.getCmp('entriLautRadio1').getValue()) {
            return '1';
        } else if (Ext.getCmp('entriLautRadio2').getValue()) {
            return '2';
        } else {
            return '3';
        }
    },

    convertJenisKontrakToString: function (codeFlagTransport) {
        var retValue = '';

        if (codeFlagTransport == '0') {
            retValue = 'CIF';
        } else if (codeFlagTransport == '1') {
            retValue = 'FOB';
        } else if (codeFlagTransport == '2') {
            retValue = 'Curah';
        } else if (codeFlagTransport == '3') {
            retValue = 'FOB + Curah';
        }

        return retValue;
    },

    convertJenisKontrakToKebutuhanTransport: function (codeFlagTransport) {
        if (codeFlagTransport == '0') {
            return true;
        } else {
            return false;
        }
    },

    twoDigitMonth: function (param) {
        var month = parseInt(param);
        var retValue = '';

        if (month < 10)
            retValue = '0' + month;
        else
            retValue = month;

        return retValue;
    },

    convertStringToBoolean : function(strBoolean){
        if(strBoolean=="1")
            return true;
        else
            return false;
    },

    convertRupiahToNumber : function(str){
        var retValue = 0;
        if(str == ''  ){
            retValue = 0;
        } else {
            retvalue = str.replace('Rp.', '');
            retvalue = retvalue.replace(',', '');
            retvalue = retvalue.replace('.', '');
        }
        return retValue;
    }



});