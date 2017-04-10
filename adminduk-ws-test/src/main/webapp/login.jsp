<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>WS Client Login</title>
        <link href="images/logo.png" rel="shortcut icon">
        <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap-theme.min.css">

        <style>
            body {
                padding-top: 40px;
                padding-bottom: 40px;
                background-color: #b5a5fd;
            }

            .form-signin {
                max-width: 330px;
                padding: 15px;
                margin: 0 auto;
            }
            .form-signin .form-signin-heading,
            .form-signin .checkbox {
                margin-bottom: 10px;
            }
            .form-signin .checkbox {
                font-weight: normal;
            }
            .form-signin .form-control {
                position: relative;
                height: auto;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                padding: 10px;
                font-size: 16px;
            }
            .form-signin .form-control:focus {
                z-index: 2;
            }
            .form-signin input[type="password"] {
                margin-bottom: 10px;
                border-top-left-radius: 20;
                border-top-right-radius: 20;
            }
        </style>

    </head>
    <body>
        <div class="container">
            <% if (request.getParameter("error") != null) { %>
                 <div class="alert alert-danger">${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}</div>
            <% } %>
            <form class="form-signin" role="form" method="post">
                <center>
                    <img src="images/logo.png" style="height: 200px; width: 200px;"/>
                    <h3>Silahkan Masuk</h3>
                </center>
                <input type="text" name="username" class="form-control" placeholder="Nama Pengguna" required autofocus>
                <input type="password" name="password" class="form-control" placeholder="Kata Sandi" required>
                <input type="hidden" name="spring-security-redirect" value="http://google.com">
                <input type="hidden"
                       name="${_csrf.parameterName}"
                       value="${_csrf.token}"/>

                <button class="btn btn-lg btn-warning btn-block" type="submit">Masuk</button>
            </form>
        </div>
    </body>
</html>
