/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package id.go.depdagri.adminduk.api.controller;

import id.go.depdagri.adminduk.api.dto.LaporanTahunan;
import id.go.depdagri.adminduk.api.dto.LaporanTahunanDetail;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import net.sf.jxls.exception.ParsePropertyException;
import net.sf.jxls.transformer.Workbook;
import net.sf.jxls.transformer.XLSTransformer;
import oracle.jdbc.internal.OracleTypes;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author adi
 */


@Controller
@RequestMapping("/export")
public class ExportController {
    
    @Autowired
    private DataSource dataSource;

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "{param}",method = RequestMethod.GET)
    @ResponseBody
    public void export(@PathVariable String param, HttpServletRequest request, 
            HttpServletResponse response) throws Exception {
        LOGGER.info("Request Export Data [{}]", param);

        List<String> reqParam = Arrays.asList(param.toLowerCase().split("&"));
        List<Map> data = new ArrayList<Map>();

        CallableStatement call = null;
        Connection con = null;
        ResultSet rs = null;
        
        String kode = "export";
        
        try {
            con = dataSource.getConnection();

            //clear setter
            call = con.prepareCall("{call PARSING_CLEAR()}");
            call.execute();

            String sql = "{call PARSING(?,?)}";
            for (int i = 0; i < reqParam.size(); i++) {
                String paramName = reqParam.get(i).split("=")[0];
                String paramValue = reqParam.get(i).split("=")[1];
                if(paramName.equalsIgnoreCase("KODE")){
                    kode = paramValue;
                }
                
                //clear Parsing
                call = con.prepareCall(sql);
                call.setString(1, paramName);
                call.setString(2, null);
                call.execute();

                //Set Parsing
                call = con.prepareCall(sql);
                call.setString(1, paramName);
                if (reqParam.get(i).split("=").length > 1)
                    call.setString(2, paramValue.toUpperCase());
                else
                    call.setString(2, null);
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

            while (rs.next()) {
                map = new HashMap();
                for (int i = 1; i <= colCount; i++) {
                    map.put(rsmd.getColumnName(i), rs.getObject(i));
                }
                data.add(map);
            }
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
        generateXlsFile(data, kode, request, response);
    }
    
    private void generateXlsFile(List<Map> data, String kode, 
            HttpServletRequest request, 
            HttpServletResponse response) throws Exception{
        
        String templateFile = request.getServletContext().getRealPath("/WEB-INF/excel/laporanTahunan.xls");
        String resultFile = System.getProperty("java.io.tmpdir") + File.separator + "laporan-tahunan.xls";
        LOGGER.info("Template [{}]  result[{}]", templateFile, resultFile);
        
        Map<String,List<Map>> groupData = new HashMap<String, List<Map>>();
        
        //Looping data dari database
        for (Map map : data) {
            List<Map> a = groupData.get(map.get("TAHUN"));
            if(a==null) a = new ArrayList<Map>();
            a.add(map);
            groupData.put(map.get("TAHUN").toString(), a);
        }
        
        //Create Object for XlsTransformer
        List<LaporanTahunan> laporanTahunans = new ArrayList<LaporanTahunan>();
        for (String key : groupData.keySet()) {
            LaporanTahunan lt = new LaporanTahunan();
            lt.setTahun(key);
            
            List<Map> a = groupData.get(key);
            for(Map map : a){
                LaporanTahunanDetail ltd = new LaporanTahunanDetail();
                ltd.setInstansi(map.get("NAMA_DATA").toString());
                ltd.setJumlah(new BigDecimal(map.get("JUMLAH_DATA").toString()).setScale(0));
                lt.getLaporanTahunanDetails().add(ltd);
            }
            laporanTahunans.add(lt);
        }
        Collections.sort(laporanTahunans);
        Map beans = new HashMap();
        beans.put("laporans", laporanTahunans);
        XLSTransformer transformer = new XLSTransformer();
        transformer.groupCollection( "laporans.laporanTahunanDetails" );
        transformer.transformXLS(templateFile, beans, resultFile);
        
        response.setContentType("application/vnd.ms-excel");
        String headerKey = "Content-Disposition";
        String headerValue = String.format("attachment; filename=\"%s\"",
                kode + ".xls");
        response.setHeader(headerKey, headerValue);
        
        FileInputStream fileIn = new FileInputStream(new File(resultFile));
        ServletOutputStream out = response.getOutputStream();
        int dataByte = -1;
        while((dataByte=fileIn.read()) != -1){
            out.write(dataByte);
        }
    }
    
    private void generateCsvFile(List<Map> data, String kode, HttpServletResponse response) throws IOException{
        StringBuilder sb = new StringBuilder();
        
        //Add Header/Field
        Map<String,Object> header = data.get(0);
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
        
        for (Map<String,Object> obj : data) {
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
                kode + ".csv");
        response.setHeader(headerKey, headerValue);
        
        PrintWriter writer = response.getWriter();
        writer.append(sb.toString());
        writer.flush();
	writer.close();
    }
    
}
