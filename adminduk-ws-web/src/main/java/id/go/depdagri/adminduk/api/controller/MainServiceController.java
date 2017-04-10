package id.go.depdagri.adminduk.api.controller;

import id.go.depdagri.adminduk.util.ErrorObject;
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
import java.net.URI;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.*;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.util.UriTemplate;

@Controller
@RequestMapping("/service")
public class MainServiceController {

    @Autowired
    private DataSource dataSource;

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "{param}",method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public Map<String, Object> handleServiceGet(@PathVariable String param, HttpServletRequest request) throws Exception {
        LOGGER.info("Request Parameter GET/POST [{}]", param);

        Map<String, Object> result = new HashMap<String, Object>();
        List<String> list = Arrays.asList(param.toLowerCase().split("&"));

        List<Map> listMap = new ArrayList<Map>();

        CallableStatement call = null;
        Connection con = null;
        ResultSet rs = null;
            
        try {
            con = dataSource.getConnection();

            //clear setter
            call = con.prepareCall("{call PARSING_CLEAR()}");
            call.execute();

            String sql = "{call PARSING(?,?)}";
            for (int i = 0; i < list.size(); i++) {
                //clear Parsing
                call = con.prepareCall(sql);
                call.setString(1, list.get(i).split("=")[0]);
                call.setString(2, null);
                call.execute();

                //Set Parsing
                call = con.prepareCall(sql);
                call.setString(1, list.get(i).split("=")[0]);
                if (list.get(i).split("=").length > 1)
                    call.setString(2, list.get(i).split("=")[1].toUpperCase());
                else
                    call.setString(2, null);
                call.execute();
            }

            //paging function
            String pageSize = request.getParameter("limit");
            String pageNumber = request.getParameter("page.page");
            if (pageSize != null && pageNumber != null) {
                //Page Size
                call = con.prepareCall(sql);
                call.setString(1, "pageSize");
                call.setString(2, pageSize);
                call.execute();
                
                //Page Number
                call = con.prepareCall(sql);
                call.setString(1, "pageNumber");
                call.setString(2, pageNumber);
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

            String columnName;
            Object data;
            Map map;
            BigDecimal countData = new BigDecimal(0);

            while (rs.next()) {
                map = new HashMap();
                for (int i = 1; i <= colCount; i++) {
                    map.put(rsmd.getColumnName(i), rs.getObject(i));
                    columnName = rsmd.getColumnName(i).toLowerCase();
                    data = rs.getObject(i);

                    //countdata
                    if (columnName.toUpperCase().equals("COUNT_DATA"))
                        countData = (BigDecimal) data;
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
            LOGGER.error(ex.getMessage(), ex);
        } finally {
            try {
                if(call!=null) call.close();
                if(con!=null) con.close();
                if(rs!=null) rs.close();
            } catch (SQLException ex) {
                throw new Exception(ex.getMessage(), ex);
            }
        }
        return result;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> create(@Valid @RequestBody Map<String, String> o, HttpServletRequest request, HttpServletResponse response) throws Exception {

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
                String requestUrl = request.getRequestURL().toString();
                URI uri = new UriTemplate("{requestUrl}{id}").expand(requestUrl, rs);
                response.setHeader("Location", uri.toASCIIString());
            }
        } catch (Exception ex) {
            LOGGER.error(ex.getMessage(), ex);
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
    
    @RequestMapping(value = "/saveArray", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createArr(@Valid @RequestBody List<Map<String, String>> o, 
            HttpServletRequest request, 
            HttpServletResponse response) throws Exception {
        
        for (Map<String, String> obj : o) {
            if (!StringUtils.isEmpty(obj.get("KODE")) && obj.get("KODE").equalsIgnoreCase("DML_PRA_KSO_INSERT_HASIL_TITIK_BOR")) {
                Map<String, String> dmlUrut = new HashMap<String, String>();
                dmlUrut.put("KODE", "DML_URUT_URUT_ID_HASIL_TITIK_BOR");

                Map<String, Object> result = create(dmlUrut, request, response);
                obj.put("ID_HASIL_TITIK_BOR", (String) result.get("result"));
            }
        }

        for (Map<String, String> obj : o) {
            System.out.println("kode = " + obj.get("KODE"));


            List<String> listKey = new ArrayList<String>(obj.keySet());
            List<String> listValue = new ArrayList<String>(obj.values());
            Map<String, Object> result = new HashMap<String, Object>();
            List<Map> listMap = new ArrayList<Map>();

            String sql = "";
            CallableStatement call = null;
            Connection con = null;
            try {

                con = dataSource.getConnection();

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
                }

                String requestUrl = request.getRequestURL().toString();
                URI uri = new UriTemplate("{requestUrl}{id}").expand(requestUrl, rs);
                response.setHeader("Location", uri.toASCIIString());
            } catch (Exception ex) {
                throw new Exception(ex.getMessage());
            } finally {
                try {
                    con.close();
                    call.close();
                } catch (SQLException e) {
                    throw new Exception(e.getMessage());
                }
            }
        }

    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ErrorObject handleException(Exception ex) {
        LOGGER.error("Terjadi Exception [{}]", ex.getMessage(), ex);
        ErrorObject obj = new ErrorObject();
        obj.setMsg(ex.getMessage());
        return obj;
    }
}
