Ext.define('AdmindukWS.util.SecurityHelper', {
    singleton: true,
    loggedUser: {},
    _authorities: [],

    initialize: function (user) {
        if (user) {
            this.loggedUser = user;
            this._authorities = Ext.Array.map(this.loggedUser.authorities, function (record) {
                return record.authority;
            }, this);
        }
    },

    getNama: function () {
        if (this.loggedUser) {
            return this.loggedUser.nama;
        }
    },

    getAuthorities: function () {
        return this._authorities;
    },

    isWriteAllowed: function (role) {
        return Ext.Array.contains(this._authorities, role);
    },

    isReadAllowed: function (role) {
        var self = this;
        if (role) {
            var baseRole = role;
            if (this._endsWith(role, "_READ")) {
                baseRole = role.substr(0, role.length - "_READ".length);
            } else if (this._endsWith(role, "_WRITE")) {
                baseRole = role.substr(0, role.length - "_WRITE".length);
            }

            return Ext.Array.contains(this._authorities, baseRole + "_READ") || Ext.Array.contains(this._authorities, baseRole + "_WRITE");
        } else {
            return false;
        }

    },
    
    isAllowed: function(screenName) {
        return Ext.Array.contains(this._authorities, screenName);
    },
    
    checkUser: function() {
        return 'Logged as <b>' + this.loggedUser.nama + '</b>@test';
    },

    getUnitSatuanKerja: function () {
        if (this.loggedUser) {
            return this.loggedUser.unitSatuanKerja;
        }
    },

    _endsWith: function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
});

