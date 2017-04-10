<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title id="page-title">Monitoring Layanan Data Kependudukan</title>
        <link rel="shortcut icon" href="<c:url value="/resources/img/logo.png"/>">

        <link rel="stylesheet" type="text/css" href='<c:url value="/resources/css/ext-all-gray.css"/>'>
        <link rel="stylesheet" type="text/css" href='<c:url value="/resources/css/header.css"/>'>
        <link rel="stylesheet" type="text/css" href='<c:url value="/resources/css/fam-icons.css"/>'>
        <link rel="stylesheet" type="text/css" href='<c:url value="/resources/css/icons.css"/>'>
        <link rel="stylesheet" type="text/css" href='<c:url value="/resources/css/custom.css"/>'>
        <link rel="stylesheet" type="text/css" href='<c:url value="/resources/js/extjs/ux/css/CheckHeader.css"/>'>
        <link rel="stylesheet" type="text/css" href='<c:url value="/resources/js/extjs/ux/css/GroupTabPanel.css"/>'>
        <link rel="stylesheet" type="text/css" href='<c:url value="/resources/js/extjs/ux/css/ItemSelector.css"/>'>
        <link rel="stylesheet" type="text/css" href='<c:url value="/resources/js/extjs/ux/css/LiveSearchGridPanel.css"/>'>
        <link rel="stylesheet" type="text/css" href='<c:url value="/resources/js/extjs/ux/css/TabScrollerMenu.css"/>'>


        <!-- Config -->
        <script type="text/javascript">

            var cleanUrl = function(path) {
                var indexOfJSessionId = path.indexOf(";jsessionid");
                if (indexOfJSessionId != -1) {
                    path = path.substring(0, indexOfJSessionId);
                }
                return path;
            };

            AdmindukWSStringUtil = {};
            AdmindukWSStringUtil.isEmpty = function(strValue) {
                return (!strValue || 0 === strValue.length);
            };

            AdmindukWSErrorUtil = {};
            AdmindukWSErrorUtil.failureHandler = function(fp, o) {
                console.info('--> failure fp ', fp);
                console.info('--> failure o ', o);

                if (Ext.JSON.decode(fp.responseText) != undefined) {
                    Ext.Msg.alert('Error', Ext.JSON.decode(fp.responseText).msg);
                } else {
                    console.info('Ext.form.action.Action.SERVER_INVALID ', Ext.form.action.Action.SERVER_INVALID);
                    switch (o.failureType) {
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Error', o.result.msg);
                    }
                }
            };

            AdmindukWS = {};
            AdmindukWS.config = {};

            AdmindukWS.config.loggedAuthorities = [];
            AdmindukWS.config.loaderPath = cleanUrl('<c:url value="/resources/js/extjs/ux"/>');
            AdmindukWS.config.chartLoaderPath = cleanUrl('<c:url value="/resources/js/Chart"/>');
            AdmindukWS.config.appFolder = cleanUrl('<c:url value="/resources/js/app"/>');
            AdmindukWS.config.resourcesPath = cleanUrl('<c:url value="/resources/"/>');
            AdmindukWS.config.logoutUrl = cleanUrl('<c:url value="/logout"/>');
            AdmindukWS.config.uploadUrl = cleanUrl('<c:url value="/api/config/"/>');
            AdmindukWS.config.apiPath = cleanUrl('<c:url value="/api/"/>');
            AdmindukWS.config.tempFile = cleanUrl('<c:url value="/resources/tempfile/"/>');

            AdmindukWS.config.roleUrl = AdmindukWS.config.apiPath + "role/";
            AdmindukWS.config.groupUrl = AdmindukWS.config.apiPath + "group/";
            AdmindukWS.config.userUrl = AdmindukWS.config.apiPath + "user/";
            AdmindukWS.config.userActivityUrl = AdmindukWS.config.apiPath + "userActivity/";

            AdmindukWS.config.menuUrl = AdmindukWS.config.apiPath + "user/menu";
            AdmindukWS.config.loggedUserUrl = AdmindukWS.config.apiPath + "user/loggedUser";
            AdmindukWS.config.terimaBBUrl = AdmindukWS.config.apiPath + "terimaBB/";
            AdmindukWS.config.terimaBBTahunanUrl = AdmindukWS.config.apiPath + "terimaBBTahunan/";
            AdmindukWS.config.terimaBBBulananUrl = AdmindukWS.config.apiPath + "terimaBBBulanan/";
            AdmindukWS.config.mlokasiUrl = AdmindukWS.config.apiPath + "mlokasi/";

            AdmindukWS.config.servicePath = cleanUrl('<c:url value="/service"/>');
            AdmindukWS.config.servicePostPath = AdmindukWS.config.servicePath + "/post";
            AdmindukWS.config.saveArrayUrl = AdmindukWS.config.servicePath + "/saveArray";
            AdmindukWS.config.saveUrl = AdmindukWS.config.servicePath + "/save";
            AdmindukWS.config.exportUrl = cleanUrl('<c:url value="/export"/>');
        </script>

        <script type="text/javascript" src='<c:url value="/resources/js/extjs/ext-all.js"/>'></script>
        <script type="text/javascript" src='<c:url value="/resources/js/app/util/SecurityHelper.js"/>'></script>
        <script type="text/javascript" src='<c:url value="/resources/js/app/app.js"/>'></script>
        <script src='<c:url value="/resources/js/extjs/Exporter-all.js"/>' type="text/javascript"></script>
    </script>    
    <style type="text/css">

        body {
            background-image: url("<c:url value="resources/img/banner-bg.jpg" />");
        }

        #loading {
            position: absolute;
            left: 40%;
            top: 35%;
            z-index: 20001;
            height: auto;
        }

        #loading .loading-indicator {
            font: bolder 13px tahoma, arial, helvetica;
            margin: 0;
            text-align: center;
            height: 120px;
            width: 145px;
        }


    </style>
</head>
<body>
    <div id="loading">
        <div class="loading-indicator">
            <table>
                <tr>
                    <td><img src="<c:url value="/resources/img/logo.png"/>" alt="loading"/></td>
                    <td>
                        <img src="<c:url value="/resources/img/extanim32big.gif"/>" alt="loading"/> <br/>
                        Loading...
                    </td>
                </tr>
            </table>

        </div>
    </div>
</body>
</html>