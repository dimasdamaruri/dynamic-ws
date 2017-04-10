/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package id.go.depdagri.adminduk.api.dto;

import java.math.BigDecimal;

/**
 *
 * @author adi
 */
public class LaporanTahunanDetail {
    
    String instansi;
    BigDecimal jumlah;

    public String getInstansi() {
        return instansi;
    }

    public void setInstansi(String instansi) {
        this.instansi = instansi;
    }

    public BigDecimal getJumlah() {
        return jumlah;
    }

    public void setJumlah(BigDecimal jumlah) {
        this.jumlah = jumlah;
    }

    
}
