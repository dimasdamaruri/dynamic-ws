/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package id.go.depdagri.adminduk.api.dto;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author adi
 */
public class LaporanTahunan implements Comparable<LaporanTahunan>{
    
    private String tahun;
    private List<LaporanTahunanDetail> laporanTahunanDetails = new ArrayList<LaporanTahunanDetail>();

    public String getTahun() {
        return tahun;
    }

    public void setTahun(String tahun) {
        this.tahun = tahun;
    }

    public List<LaporanTahunanDetail> getLaporanTahunanDetails() {
        return laporanTahunanDetails;
    }

    public void setLaporanTahunanDetails(List<LaporanTahunanDetail> laporanTahunanDetails) {
        this.laporanTahunanDetails = laporanTahunanDetails;
    }

    @Override
    public int compareTo(LaporanTahunan o) {
        return o.getTahun().compareTo(tahun);
    }
    
    
}
