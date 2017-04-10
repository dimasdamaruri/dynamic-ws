/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package id.go.depdagri.adminduk.util;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author jimmy
 */
public class DokIBHelper {
    
    private List<MultipartFile> DOK;
    
    private List<String> NAMA_DOKUMEN;
    
    private List<String> KODE_DOKUMEN;

    public List<MultipartFile> getDOK() {
        return DOK;
    }

    public void setDOK(List<MultipartFile> DOK) {
        this.DOK = DOK;
    }

    public List<String> getNAMA_DOKUMEN() {
        return NAMA_DOKUMEN;
    }

    public void setNAMA_DOKUMEN(List<String> NAMA_DOKUMEN) {
        this.NAMA_DOKUMEN = NAMA_DOKUMEN;
    }

    public List<String> getKODE_DOKUMEN() {
        return KODE_DOKUMEN;
    }

    public void setKODE_DOKUMEN(List<String> KODE_DOKUMEN) {
        this.KODE_DOKUMEN = KODE_DOKUMEN;
    }

    
    
}