package id.go.depdagri.adminduk.api.util.helper;

import id.go.depdagri.adminduk.api.domain.security.SecManMUser;
import id.go.depdagri.adminduk.api.dto.MenuDTO;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;

public class MenuTreeHelper {
    public static MenuDTO buildTree(SecManMUser u) {
        MenuDTO kajianRisikoMenu = new MenuDTO("Kajian Risiko Menu");

        MenuDTO kajianRisiko = new MenuDTO("Kajian Risiko", "kajianRisikoList");
        MenuDTO identifikasiRisiko = new MenuDTO("Identifikasi Risiko", "identifikasiRisikoList");
        MenuDTO deskripsiRisiko = new MenuDTO("Deskripsi Risiko", "deskripsiRisikoList");
        MenuDTO lokasiRisiko = new MenuDTO("Lokasi Risiko", "lokasiRisikoList");
        MenuDTO petaRisikoDataMatrix = new MenuDTO("Matrix Peta Risiko Data", "matrixPetaRisikoDataContainer");

        /*   MenuDTO pemantauanMenu = new MenuDTO("Pemantauan");
        MenuDTO mitigasiRisiko = new MenuDTO("Mitigasi Risiko");
        pemantauanMenu.addChild(mitigasiRisiko);
        MenuDTO indikatorRisiko = new MenuDTO("Indikator Risiko");
        pemantauanMenu.addChild(indikatorRisiko);
        MenuDTO assesmentRisikoBaru = new MenuDTO("Assesment Risiko Baru");
        pemantauanMenu.addChild(assesmentRisikoBaru);


        MenuDTO laporanMenu = new MenuDTO("Laporan");
        MenuDTO profilRisiko = new MenuDTO("Profil Risiko");
        laporanMenu.addChild(profilRisiko);
        MenuDTO keyRisiko = new MenuDTO("Key Risiko");
        laporanMenu.addChild(keyRisiko);
        MenuDTO riskRegister = new MenuDTO("Risk Register");
        laporanMenu.addChild(riskRegister);
        MenuDTO indikator = new MenuDTO("Indikator");
        laporanMenu.addChild(indikator);
        MenuDTO laporanPemantauanTriwulan = new MenuDTO("Laporan Pemantauan Triwulan");
        laporanMenu.addChild(laporanPemantauanTriwulan);
        MenuDTO amalgasi = new MenuDTO("Amalgamasi");
        laporanMenu.addChild(amalgasi);*/

        MenuDTO securityMenu = new MenuDTO("Security");
        MenuDTO role = new MenuDTO("Role", "roleList");
        MenuDTO group = new MenuDTO("Group", "groupList");
        MenuDTO user = new MenuDTO("User", "userList");
        MenuDTO jenisUnit = new MenuDTO("Jenis Unit", "jenisUnitList");
        MenuDTO userActivity = new MenuDTO("User Activity", "userActivityList");

        MenuDTO organisasiMenu = new MenuDTO("Organisasi");
        MenuDTO unit = new MenuDTO("Unit", "unitList");
        MenuDTO divisi = new MenuDTO("Divisi", "divisiList");
        MenuDTO anakPerusahaan = new MenuDTO("Anak Perusahaan", "anakPerusahaanList");
        MenuDTO direktorat = new MenuDTO("Direktorat", "direktoratList");
        MenuDTO lokasi = new MenuDTO("Lokasi", "lokasiList");
        MenuDTO jabatan = new MenuDTO("Jabatan", "jabatanList");


        MenuDTO matriksPetaRisikoMenu = new MenuDTO("Matriks Peta Risiko", "petaRisikoContainer");

        MenuDTO kriteriaRisikoMenu = new MenuDTO("Kriteria Risiko");
        MenuDTO kriteriaKemungkinan = new MenuDTO("Kemungkinan", "kriteriaKemungkinanContainer");
        MenuDTO kriteriaDampakPusat = new MenuDTO("Dampak Terhadap Pusat", "kriteriaDampakPusatContainer");
        MenuDTO kriteriaDampakUnit = new MenuDTO("Dampak Terhadap Unit", "kriteriaDampakUnitContainer");

        MenuDTO taxonomiRisikoMenu = new MenuDTO("Taxonomi Risiko", "riskTaxonomyContainer");
        MenuDTO pendaftaranPelaporanMenu = new MenuDTO("Pendaftaran & Pelaporan", "periodeDaftarLaporList");
        MenuDTO bulletinBoardMenu = new MenuDTO("Bulletin Board", "bulletinBoardList");

        Collection collection = u.getAuthorities();

        for (GrantedAuthority ga : u.getAuthorities()) {
            if (ga.getAuthority().startsWith("ROLE")) {
                role.setVisible(true);
            } else if (ga.getAuthority().startsWith("KAJIAN_RISIKO")) {
                kajianRisiko.setVisible(true);
            } else if (ga.getAuthority().startsWith("IDENTIFIKASI_RISIKO")) {
                identifikasiRisiko.setVisible(true);
            } else if (ga.getAuthority().startsWith("DESKRIPSI_RISIKO")) {
                deskripsiRisiko.setVisible(true);
            } else if (ga.getAuthority().startsWith("LOKASI_RISIKO")) {
                lokasiRisiko.setVisible(true);
            } else if (ga.getAuthority().startsWith("PETA_RISIKO_DATA")) {
                petaRisikoDataMatrix.setVisible(true);
            } else if (ga.getAuthority().startsWith("GROUP")) {
                group.setVisible(true);
            } else if (ga.getAuthority().startsWith("USER_ACTIVITY")) {
                userActivity.setVisible(true);
            } else if (ga.getAuthority().startsWith("USER")) {
                user.setVisible(true);
            } else if (ga.getAuthority().startsWith("JENIS_UNIT")) {
                jenisUnit.setVisible(true);
            } else if (ga.getAuthority().startsWith("DIREKTORAT")) {
                direktorat.setVisible(true);
            } else if (ga.getAuthority().startsWith("TAKSONOMI_RISIKO")) {
                taxonomiRisikoMenu.setVisible(true);
            } else if (ga.getAuthority().startsWith("DIVISI")) {
                divisi.setVisible(true);
            } else if (ga.getAuthority().startsWith("ANAK_PERUSAHAAN")) {
                anakPerusahaan.setVisible(true);
            } else if (ga.getAuthority().startsWith("UNIT")) {
                unit.setVisible(true);
            } else if (ga.getAuthority().startsWith("KRITERIA_KEMUNGKINAN")) {
                kriteriaKemungkinan.setVisible(true);
            } else if (ga.getAuthority().startsWith("KRITERIA_DAMPAK_PUSAT")) {
                kriteriaDampakPusat.setVisible(true);
            } else if (ga.getAuthority().startsWith("KRITERIA_DAMPAK_UNIT")) {
                kriteriaDampakUnit.setVisible(true);
            } else if (ga.getAuthority().startsWith("PETA_RISIKO")) {
                matriksPetaRisikoMenu.setVisible(true);
            } else if (ga.getAuthority().startsWith("PERIODE_DAFTAR_LAPOR")) {
                pendaftaranPelaporanMenu.setVisible(true);
            } else if (ga.getAuthority().startsWith("KRITERIA_DAMPAK_UNIT")) {
                kriteriaDampakUnit.setVisible(true);
            } else if (ga.getAuthority().startsWith("LOKASI")) {
                lokasi.setVisible(true);
            } else if (ga.getAuthority().startsWith("JABATAN")) {
                jabatan.setVisible(true);
            } else if (ga.getAuthority().startsWith("BULLETIN_BOARD")) {
                bulletinBoardMenu.setVisible(true);
            }
        }

        MenuDTO root = new MenuDTO("Root");

        List<MenuDTO> menu = new ArrayList<MenuDTO>();

        if (role.isVisible()) {
            securityMenu.addChild(role);
        }
        if (group.isVisible()) {
            securityMenu.addChild(group);
        }
        if (user.isVisible()) {
            securityMenu.addChild(user);
        }
        if (jenisUnit.isVisible()) {
            securityMenu.addChild(jenisUnit);
        }
        if (userActivity.isVisible()) {
            securityMenu.addChild(userActivity);
        }

        if (unit.isVisible()) {
            organisasiMenu.addChild(unit);
        }
        if (divisi.isVisible()) {
            organisasiMenu.addChild(divisi);
        }
        if (anakPerusahaan.isVisible()) {
            organisasiMenu.addChild(anakPerusahaan);
        }

        if (direktorat.isVisible()) {
            organisasiMenu.addChild(direktorat);
        }
        if (lokasi.isVisible()) {
            organisasiMenu.addChild(lokasi);
        }
        if (jabatan.isVisible()) {
            organisasiMenu.addChild(jabatan);
        }

        if (kriteriaKemungkinan.isVisible()) {
            kriteriaRisikoMenu.addChild(kriteriaKemungkinan);
        }
        if (kriteriaDampakPusat.isVisible()) {
            kriteriaRisikoMenu.addChild(kriteriaDampakPusat);
        }
        if (kriteriaDampakUnit.isVisible()) {
            kriteriaRisikoMenu.addChild(kriteriaDampakUnit);
        }


        if (kajianRisiko.isVisible()) {
            kajianRisikoMenu.addChild(kajianRisiko);
        }
        if (identifikasiRisiko.isVisible()) {
            kajianRisikoMenu.addChild(identifikasiRisiko);
        }
        if (deskripsiRisiko.isVisible()) {
            kajianRisikoMenu.addChild(deskripsiRisiko);
        }
        if (lokasiRisiko.isVisible()) {
            kajianRisikoMenu.addChild(lokasiRisiko);
        }
        if (petaRisikoDataMatrix.isVisible()) {
            kajianRisikoMenu.addChild(petaRisikoDataMatrix);
        }

        //====================================================================================
        if (kajianRisikoMenu.isVisible()) {
            menu.add(kajianRisikoMenu);
        }

        if (securityMenu.isVisible()) {
            menu.add(securityMenu);
        }

        if (organisasiMenu.isVisible()) {
            menu.add(organisasiMenu);
        }

        if (matriksPetaRisikoMenu.isVisible()) {
            menu.add(matriksPetaRisikoMenu);
        }

        if (kajianRisikoMenu.isVisible()) {
            menu.add(kriteriaRisikoMenu);
        }

        if (taxonomiRisikoMenu.isVisible()) {
            menu.add(taxonomiRisikoMenu);
        }

        if (pendaftaranPelaporanMenu.isVisible()) {
            menu.add(pendaftaranPelaporanMenu);
        }

        if (bulletinBoardMenu.isVisible()) {
            menu.add(bulletinBoardMenu);
        }

        root.setChildren(menu);
        return root;
    }

}
