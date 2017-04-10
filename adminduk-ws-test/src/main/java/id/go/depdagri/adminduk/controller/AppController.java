/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package id.go.depdagri.adminduk.controller;

import java.io.PrintWriter;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;
import oracle.jdbc.internal.OracleTypes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author anggi
 */
@RestController
@RequestMapping("/api")
public class AppController {

    @Autowired private DataSource dataSource;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/changePassword",method = RequestMethod.POST)
    public Map<String,Object> changePassword (@RequestBody Map<String,String> obj,HttpServletRequest request,
            HttpSession session) throws Exception{
        Map<String,Object> result = new HashMap<>();
        if(obj.isEmpty()){
           result.put("message", "request parameter null");
           result.put("status", "500");
           return result;
        }
        
        String ipRequest = request.getRemoteAddr();
        if(ipRequest == null){
           ipRequest =  request.getHeader("X-FORWARDED-FOR");
        }
        logger.debug("IP Address yang mengakses adalah [{}]", ipRequest);
        
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String plainPass = SecurityContextHolder.getContext().getAuthentication().getCredentials().toString();
        String oldPassword = obj.get("oldPassword");
        String newPassword = obj.get("newPassword");
        
        if (!StringUtils.hasText(username)){
            result.put("message", "SESSION INVALID, HARAP LOGIN ULANG");
            result.put("status", "403");
            return result;
        }
        
        if(oldPassword.equalsIgnoreCase(plainPass)){
           result.put("message", "Password salah !");
           result.put("status", "500");
           return result;
        }
        
         Map<String,String> saveObj = new HashMap<>();
         saveObj.put("kode", "DML_changePass");
         saveObj.put("username", username);
         saveObj.put("oldPassword",oldPassword);
         saveObj.put("newPassword", newPassword);
         
         try {
           saveOrUpdate(obj);   
        } catch (Exception e) {
           result.put("message", "gagal merubah password");
           result.put("status", "500");
           return result;
        }
        
         result.put("message", "Berhasil menrubah password");
         result.put("status", "200");
         return result;
    }
    
    public Map<String, Object> saveOrUpdate(Map<String, String> o) throws Exception {

        List<String> listKey = new ArrayList<String>(o.keySet());
        List<String> listValue = new ArrayList<String>(o.values());
        Map<String, Object> result = new HashMap<String, Object>();

        String sql;
        Connection con = null;
        CallableStatement call = null;
        try {
            con = dataSource.getConnection();
            sql = "{call PARSING_CLEAR()}";
            call = con.prepareCall(sql);
            call.execute();

            for (int i = 0; i < listValue.size(); i++) {
                sql = "{call PARSING(?,?)}";
                call = con.prepareCall(sql);
                call.setString(1, listKey.get(i));
                if (listValue.get(i) != null)
                    call.setString(2, listValue.get(i));
                else
                    call.setString(2, listValue.get(i));

                call.execute();
            }

            sql = "{? = call FUNC_SAVEDATA}";
            call = con.prepareCall(sql);
            call.registerOutParameter(1, OracleTypes.VARCHAR);
            call.execute();

            String rs = (String) call.getString(1);

            if (!StringUtils.isEmpty(rs)) {
                if (rs.contains("XXX")) {
                    throw new Exception(rs.split(";")[1]);
                }

                result.put("result", rs.toString());
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
        } finally {
            try {
                if(call!=null) call.close();
                if(con!=null) con.close();
            } catch (SQLException ex) {
                throw new Exception(ex.getMessage(), ex);
            }
        }
        return result;
    }
    
    @RequestMapping(value = "/submit/{nik}", method = RequestMethod.POST)
    public Map<String, Object> submit(@PathVariable String nik,
            HttpServletRequest request,
            HttpSession session) throws Exception{
        
        Map<String,Object> result = new HashMap<>();
        String ipRequest = request.getRemoteAddr();
        if(ipRequest == null){
           ipRequest =  request.getHeader("X-FORWARDED-FOR");
        }
        logger.debug("IP Address yang mengakses adalah [{}]", ipRequest);
        
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String plainPass = SecurityContextHolder.getContext().getAuthentication().getCredentials().toString();
        
        if (!StringUtils.hasText(username)){
            Map<String,String> objerr = new HashMap<>();
            objerr.put("RESPON", "SESSION INVALID, HARAP LOGIN ULANG");
            List<Map> listerr = new ArrayList<>();
            listerr.add(objerr);
            result.put("content", listerr);
            return result;
        }
        
        Map<String,String> userData = getUserLogin(username);
        if (userData == null || userData.isEmpty()){
            logger.info("USER-INSTANSI TIDAK DITEMUKAN DI DATABASE");
            Map<String,String> objerr = new HashMap<>();
            objerr.put("RESPON", "USER TIDAK DAPAT DI AKSES");
            List<Map> listerr = new ArrayList<>();
            listerr.add(objerr);
            result.put("content", listerr);
            return result;
        }
        
        userData.put("PASSWORD", plainPass);
        userData.put("NIK", nik);
        userData.put("IP_ADDRESS", ipRequest);
        userData.put("KODE", "GET_JSON");
        userData.put("METODE", "CALL_NIK");
        
        result = postService(userData);
        session.setAttribute("sessionData", result.get("content"));
        return result;
    }
    
    private Map<String, String> getUserLogin(String username) throws SQLException{
        Map<String, String> result = null;
        CallableStatement call = null;
        Connection con = null;
        ResultSet rs = null;
        try {
            con = dataSource.getConnection();
            call = con.prepareCall("{call PARSING_CLEAR()}");
            call.execute();
            
            //Clear Variablenya
            call = con.prepareCall("{call PARSING(?,?)}");
            call.setString(1, "USER_ID");
            call.setString(2, null);
            call.execute();
            
            //Set Username
            call = con.prepareCall("{call PARSING(?,?)}");
            call.setString(1, "USER_ID");
            call.setString(2, username);
            call.execute();
            
            //Clear Variablenya
            call = con.prepareCall("{call PARSING(?,?)}");
            call.setString(1, "KODE");
            call.setString(2, null);
            call.execute();
            
            //Set Username
            call = con.prepareCall("{call PARSING(?,?)}");
            call.setString(1, "KODE");
            call.setString(2, "GETDATA_INSTANSI_BY_USER");
            call.execute();
            
            call = con.prepareCall("{? = call FUNC_GETDATA}");
            call.registerOutParameter(1, OracleTypes.CURSOR);
            call.execute();
            
            //Result Content
            rs = (ResultSet) call.getObject(1);
            while(rs.next()){
                result = new HashMap<>();
                result.put("USER_ID", rs.getString("USER_ID"));
                result.put("PASSWORD", rs.getString("PASSWORD"));
                result.put("INSTANSI", rs.getString("USER_DESCRIP"));
                logger.info("USER KETEMU [{}.{}.{}]", result.get("USER_ID"), 
                        result.get("PASSWORD"), result.get("INSTANSI"));
            }
        } catch (SQLException ex) {
            logger.error(ex.getMessage(), ex);
        } finally {
            if(rs!=null) rs.close();
            if(call!=null) call.close();
            if(con!=null) con.close();
        }
        return result;
    }
    
    @RequestMapping(value = "/export", method = RequestMethod.GET)
    public void export(HttpServletResponse response, HttpSession session) throws Exception {
        List<Map<String,Object>> listmap = new ArrayList<Map<String, Object>>();
        if(session.getAttribute("sessionData") != null){
            listmap = (List<Map<String, Object>>) session.getAttribute("sessionData");
        }
        
        StringBuilder sb = new StringBuilder();
        
        //Add Header/Field
        Map<String,Object> header = listmap.get(0);
        Object[] columnName = header.keySet().toArray();
        int i = 0;
        for (String s : header.keySet()) {
            i++;
            sb.append(s);
            if(i < header.keySet().size()){
                sb.append("#");
            } else {
                sb.append("\n");
            }
        }
        
        for (Map<String,Object> obj : listmap) {
            int counter = 0;
            for (Object col : columnName) {
                counter++;
                sb.append(obj.get(col.toString()).toString());
                if(counter < header.keySet().size()){
                    sb.append("#");
                } else {
                    sb.append("\n");
                }
            }
        }
        
        response.setContentType("text/csv");
        String headerKey = "Content-Disposition";
        String headerValue = String.format("attachment; filename=\"%s\"",
                "export.csv");
        response.setHeader(headerKey, headerValue);
        
        PrintWriter writer = response.getWriter();
        writer.append(sb.toString());
        writer.flush();
	writer.close();
    }
    
    
    private Map<String, Object> postService(Map<String, String> o) throws Exception {
        
        Map<String, Object> result = new HashMap<>();
        List<Map> listMap = new ArrayList<>();

        String sql;
        CallableStatement call = null;
        Connection con = null;
        ResultSet rs = null;
        try {
            con = dataSource.getConnection();
            
            //clear setter
            sql = "{call PARSING_CLEAR()}";
            call = con.prepareCall(sql);
            call.execute();
                
            
                //seting get json
                sql = "{call PARSING(?,?)}";

                //clear
                call = con.prepareCall(sql);
                call.setString(1,"KODE");
                call.setString(2, null);
                call.execute();

                call = con.prepareCall(sql);
                call.setString(1,"KODE");
                call.setString(2, o.get("KODE"));
                call.execute();

                //clear
                call = con.prepareCall(sql);
                call.setString(1,"IP_USER");
                call.setString(2, null);
                call.execute();

                call = con.prepareCall(sql);
                call.setString(1,"IP_USER");
                call.setString(2, o.get("IP_ADDRESS"));
                call.execute();

                //clear
                call = con.prepareCall(sql);
                call.setString(1,"NAMA_INSTANSI");
                call.setString(2, null);
                call.execute();

                call = con.prepareCall(sql);
                call.setString(1,"NAMA_INSTANSI");
                call.setString(2, o.get("INSTANSI"));
                call.execute();

                //clear
                call = con.prepareCall(sql);
                call.setString(1,"NAMA_METODE");
                call.setString(2, null);
                call.execute();

                call = con.prepareCall(sql);
                call.setString(1,"NAMA_METODE");
                call.setString(2, o.get("METODE"));
                call.execute();
                
            for (String key : o.keySet()) {
                sql = "{call PARSING(?,?)}";
                call = con.prepareCall(sql);
                call.setString(1, key);
                call.setString(2, o.get(key));
                call.execute();
            }

            sql = "{? = call FUNC_GETDATA}";
            call = con.prepareCall(sql);
            call.registerOutParameter(1, OracleTypes.CURSOR);
            call.execute();

            //Result Content
            rs = (ResultSet) call.getObject(1);
            ResultSetMetaData rsmd = rs.getMetaData();
            int colCount = rsmd.getColumnCount();

            Map map;
            BigDecimal countData = new BigDecimal(0);
            while (rs.next()) {
                map = new HashMap();
                for (int i = 1; i <= colCount; i++) {
                    map.put(rsmd.getColumnName(i), rs.getObject(i));
                    if (rsmd.getColumnName(i).equalsIgnoreCase("COUNT_DATA")){
                        countData = (BigDecimal) rs.getObject(i);
                    }
                }
                listMap.add(map);
            }

            if (countData.compareTo(new BigDecimal(0)) == 0) {
                countData = new BigDecimal(listMap.size());
            }

            result.put("content", listMap);
            result.put("size", listMap.size());
            result.put("number", 0);
            result.put("sort", null);
            result.put("numberOfElements", listMap.size());
            result.put("totalElements", countData);
            result.put("firstPage", true);
            result.put("lastPage", true);
        } catch (SQLException ex) {
            logger.error(ex.getMessage(), ex);
        } finally {
            if(rs!=null) rs.close();
            if(call!=null) call.close();
            if(con!=null) con.close();
        }

        return result;
    }
}
