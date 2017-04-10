/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.go.depdagri.adminduk.util;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author anggi
 */
public class DatabaseUtil {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    public static void close(Connection connection) {
        try {
            if (connection != null) {
                connection.close();
            }
        } catch (SQLException e) {
            // log exception here.
        }
    }
     public static void close(ResultSet rs) {
        try {
            if (rs != null) {
                rs.close();
            }
        } catch (SQLException e) {
            // log exception here.
        }
    }
      public static void close(CallableStatement call) {
        try {
            if (call != null) {
                call.close();
            }
        } catch (SQLException e) {
            // log exception here.
        }
    }
}
