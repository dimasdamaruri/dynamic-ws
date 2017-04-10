package id.go.depdagri.adminduk.util;

import org.apache.poi.ss.usermodel.Row;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: rezafit
 * Date: 5/7/13
 * Time: 9:11 AM
 * To change this template use File | Settings | File Templates.
 */
public class FunctionHelper {

    public static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("dd-MM-yyyy");

    public static synchronized String formatDate(Date date, String formatted) {
        if (date != null) {
            SimpleDateFormat dateFormat = new SimpleDateFormat(formatted);
            return dateFormat.format(date);
        }
        return "";
    }


    public static synchronized Map<String, Object> createHaulingPLTUMuatData(HttpServletRequest request, Row row) {
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("ASAL_STOCK_PILE", request.getParameter("ASAL_STOCK_PILE"));
        data.put("ID_PILE", request.getParameter("ID_PILE"));
        data.put("BLTH", request.getParameter("BLTH"));
        data.put("ID_PLTU", request.getParameter("ID_PLTU"));
        data.put("NAMA_PLTU", request.getParameter("NAMA_PLTU"));
        data.put("ID_MITRA", request.getParameter("ID_MITRA"));
        data.put("NAMA_MITRA", request.getParameter("NAMA_MITRA"));
        data.put("JENIS_INSTRUCTION", request.getParameter("JENIS_INSTRUCTION"));
        data.put("FLAG_TRANSPORT", request.getParameter("FLAG_TRANSPORT"));

        data.put("IDENTITAS_TRANSPORT", row.getCell(0).getStringCellValue());      //--> NOPOL
        data.put("PIC_TRANSPORT", row.getCell(1).getStringCellValue());     //--> NAMA SUPIR
        data.put("TGL_TRANSAKSI_MUAT", FunctionHelper.formatDate(row.getCell(2).getDateCellValue(), "dd-MM-yyyy")); //--> TANGGAL MUAT
        data.put("TRANSAKSI_MUAT_BY", row.getCell(3).getStringCellValue()); //--> PETUGAS TIMBANGAN MUAT
        data.put("LOAD_NOTIKET_TIMBANGAN", row.getCell(4).getStringCellValue());    //--> NO TIKET TIMBANGAN MUAT
        data.put("LOAD_TGL_MASUK", FunctionHelper.formatDate(row.getCell(5).getDateCellValue(), "dd-MM-yyyy")); //--> TANGGAL MASUK
        data.put("LOAD_JAM_MASUK", FunctionHelper.formatDate(row.getCell(6).getDateCellValue(), "HH:mm:ss"));   //--> JAM MASUK
        data.put("LOAD_TGL_KELUAR", FunctionHelper.formatDate(row.getCell(7).getDateCellValue(), "dd-MM-yyyy"));    //--> TANGGAL KELUAR
        data.put("LOAD_JAM_KELUAR", FunctionHelper.formatDate(row.getCell(8).getDateCellValue(), "HH:mm:ss"));  //--> JAM KELUAR
        data.put("LOAD_BERAT_BRUTO", row.getCell(9).getNumericCellValue()); //--> BERAT BRUTO MUAT
        data.put("LOAD_BERAT_TARA", row.getCell(10).getNumericCellValue()); //--> BERAT TARA MUAT
        data.put("LOAD_BERAT_NETTO", row.getCell(11).getNumericCellValue());    //--> BERAT NETTO MUAT
        return data;
    }

    public static synchronized Map<String, Object> createHaulingPLTUBongkarData(HttpServletRequest request, Row row) {
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("IDENTITAS_TRANSPORT", row.getCell(0).getStringCellValue());      //--> NOPOL
        data.put("PIC_TRANSPORT", row.getCell(1).getStringCellValue());     //--> NAMA SUPIR
        data.put("TGL_TRANSAKSI_BONGKAR", FunctionHelper.formatDate(row.getCell(2).getDateCellValue(), "dd-MM-yyyy"));  //--> TANGGAL BONGKAR
        data.put("TRANSAKSI_BONGKAR_BY", row.getCell(3).getStringCellValue());  //--> PETUGAS TIMBANGAN BONGKAR
        data.put("LOAD_NOTIKET_TIMBANGAN", row.getCell(4).getStringCellValue());  //--> NO TIKET TIMBANGAN MUAT
        data.put("UNLOAD_NOTIKET_TIMBANGAN", row.getCell(5).getStringCellValue());  //--> NO TIKET TIMBANGAN BONGKAR
        data.put("UNLOAD_TGL_MASUK", FunctionHelper.formatDate(row.getCell(6).getDateCellValue(), "dd-MM-yyyy"));   //--> TANGGAL MASUK
        data.put("UNLOAD_JAM_MASUK", FunctionHelper.formatDate(row.getCell(7).getDateCellValue(), "HH:mm:ss"));     //--> JAM MASUK
        data.put("UNLOAD_TGL_KELUAR", FunctionHelper.formatDate(row.getCell(8).getDateCellValue(), "dd-MM-yyyy"));  //--> TANGGAL KELUAR
        data.put("UNLOAD_JAM_KELUAR", FunctionHelper.formatDate(row.getCell(9).getDateCellValue(), "HH:mm:ss"));    //--> JAM KELUAR
        data.put("UNLOAD_BERAT_BRUTO", row.getCell(10).getNumericCellValue());   //--> BERAT BRUTO BONGKAR
        data.put("UNLOAD_BERAT_TARA", row.getCell(11).getNumericCellValue());   //--> BERAT TARA BONGKAR
        data.put("UNLOAD_BERAT_NETTO", row.getCell(12).getNumericCellValue());  //--> BERAT NETTO BONGKAR
        return data;
    }

    public static synchronized Map<String, Object> createHaulingStockpileMuatData(Row row) {
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("IDENTITAS_TRANSPORT", row.getCell(0).getStringCellValue());      //--> NOPOL
        data.put("PIC_TRANSPORT", row.getCell(1).getStringCellValue());     //--> NAMA SUPIR
        data.put("TGL_TRANSAKSI_MUAT", FunctionHelper.formatDate(row.getCell(2).getDateCellValue(), "dd-MM-yyyy")); //--> TANGGAL MUAT
        data.put("TRANSAKSI_MUAT_BY", row.getCell(3).getStringCellValue()); //--> PETUGAS TIMBANGAN MUAT
        data.put("LOAD_NOTIKET_TIMBANGAN", row.getCell(4).getStringCellValue());    //--> NO TIKET TIMBANGAN MUAT
        data.put("LOAD_TGL_MASUK", FunctionHelper.formatDate(row.getCell(5).getDateCellValue(), "dd-MM-yyyy")); //--> TANGGAL MASUK
        data.put("LOAD_JAM_MASUK", FunctionHelper.formatDate(row.getCell(6).getDateCellValue(), "HH:mm:ss"));   //--> JAM MASUK
        data.put("LOAD_TGL_KELUAR", FunctionHelper.formatDate(row.getCell(7).getDateCellValue(), "dd-MM-yyyy"));    //--> TANGGAL KELUAR
        data.put("LOAD_JAM_KELUAR", FunctionHelper.formatDate(row.getCell(8).getDateCellValue(), "HH:mm:ss"));  //--> JAM KELUAR
        data.put("LOAD_BERAT_BRUTO", row.getCell(9).getNumericCellValue()); //--> BERAT BRUTO MUAT
        data.put("LOAD_BERAT_TARA", row.getCell(10).getNumericCellValue()); //--> BERAT TARA MUAT
        data.put("LOAD_BERAT_NETTO", row.getCell(11).getNumericCellValue());    //--> BERAT NETTO MUAT
        return data;
    }

    public static synchronized Map<String, Object> createHaulingStockpileBongkarData(Row row) {
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("IDENTITAS_TRANSPORT", row.getCell(0).getStringCellValue());      //--> NOPOL
        data.put("PIC_TRANSPORT", row.getCell(1).getStringCellValue());     //--> NAMA SUPIR
        data.put("TGL_TRANSAKSI_BONGKAR", FunctionHelper.formatDate(row.getCell(2).getDateCellValue(), "dd-MM-yyyy"));  //--> TANGGAL BONGKAR
        data.put("TRANSAKSI_BONGKAR_BY", row.getCell(3).getStringCellValue());  //--> PETUGAS TIMBANGAN BONGKAR
        data.put("LOAD_NOTIKET_TIMBANGAN", row.getCell(4).getStringCellValue());  //--> NO TIKET TIMBANGAN MUAT
        data.put("UNLOAD_NOTIKET_TIMBANGAN", row.getCell(5).getStringCellValue());  //--> NO TIKET TIMBANGAN BONGKAR
        data.put("UNLOAD_TGL_MASUK", FunctionHelper.formatDate(row.getCell(6).getDateCellValue(), "dd-MM-yyyy"));   //--> TANGGAL MASUK
        data.put("UNLOAD_JAM_MASUK", FunctionHelper.formatDate(row.getCell(7).getDateCellValue(), "HH:mm:ss"));     //--> JAM MASUK
        data.put("UNLOAD_TGL_KELUAR", FunctionHelper.formatDate(row.getCell(8).getDateCellValue(), "dd-MM-yyyy"));  //--> TANGGAL KELUAR
        data.put("UNLOAD_JAM_KELUAR", FunctionHelper.formatDate(row.getCell(9).getDateCellValue(), "HH:mm:ss"));    //--> JAM KELUAR
        data.put("UNLOAD_BERAT_BRUTO", row.getCell(10).getNumericCellValue());   //--> BERAT BRUTO BONGKAR
        data.put("UNLOAD_BERAT_TARA", row.getCell(11).getNumericCellValue());   //--> BERAT TARA BONGKAR
        data.put("UNLOAD_BERAT_NETTO", row.getCell(12).getNumericCellValue());  //--> BERAT NETTO BONGKAR
        return data;
    }


}
