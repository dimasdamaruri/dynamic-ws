package id.go.depdagri.adminduk.api.controller;

import id.go.depdagri.adminduk.util.ErrorObject;
import java.io.PrintWriter;
import oracle.jdbc.internal.OracleTypes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.*;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

/**
 * Created with IntelliJ IDEA.
 * User: rezafit
 * Date: 2/26/13
 * Time: 2:38 PM
 * To change this template use File | Settings | File Templates.
 */
@Controller
public class MainServiceController {

    @Autowired
    private DataSource dataSource;

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @RequestMapping(value = "/{kode}/{instansi}/{method}", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> postService(@PathVariable String kode ,
            @PathVariable String instansi,
            @PathVariable String method,
            @Valid @RequestBody Map<String, String> o, 
            HttpServletRequest request, HttpSession session) throws Exception {
        
        String ipRequest = request.getRemoteAddr();
        if(ipRequest == null){
           ipRequest =  request.getHeader("X-FORWARDED-FOR");
        }
        logger.info("ip yang akses adalah : "+ipRequest);
        o.put("ip_address", ipRequest);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> listMap = new ArrayList<Map>();

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
                call.setString(2, kode);
                call.execute();
                
                 //seting ip user
                sql = "{call PARSING(?,?)}";

                //clear
                call = con.prepareCall(sql);
                call.setString(1,"IP_USER");
                call.setString(2, null);
                call.execute();

                call = con.prepareCall(sql);
                call.setString(1,"IP_USER");
                call.setString(2, ipRequest);
                call.execute();

               //seting instansi
                sql = "{call PARSING(?,?)}";

                //clear
                call = con.prepareCall(sql);
                call.setString(1,"NAMA_INSTANSI");
                call.setString(2, null);
                call.execute();

                call = con.prepareCall(sql);
                call.setString(1,"NAMA_INSTANSI");
                call.setString(2, instansi);
                call.execute();

                //seting method
                sql = "{call PARSING(?,?)}";

                //clear
                call = con.prepareCall(sql);
                call.setString(1,"NAMA_METODE");
                call.setString(2, null);
                call.execute();

                call = con.prepareCall(sql);
                call.setString(1,"NAMA_METODE");
                call.setString(2, method);
                call.execute();
                
            for (String key : o.keySet()) {
                logger.info("debug parsing [{}]-[{}]", key, o.get(key));
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

            session.setAttribute("sessionData", listMap);
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
    
    @RequestMapping(value = "/export", method = RequestMethod.GET)
    @ResponseBody
    public void export(HttpServletResponse response, 
            HttpSession session) throws Exception {
        
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
                sb.append(";");
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
                    sb.append(";");
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

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ErrorObject handleException(Exception ex) {
        logger.error("Terjadi Exception [{}]", ex.getMessage(), ex);
        ErrorObject obj = new ErrorObject();
        obj.setMsg(ex.getMessage());
        return obj;
    }
}
