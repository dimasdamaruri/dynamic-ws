package id.go.depdagri.adminduk.api.util;

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {

        String s1 = "1";
        String s2 = "2";
        String s3 = "3";
        String s4 = "4";
        String s5 = "5";
        String s6 = "6";

        List<String> strings = new ArrayList<String>();
        strings.add(s1);
        strings.add(s2);
        strings.add(s3);
        strings.add(s4);
        strings.add(s5);
        strings.add(s6);

        System.out.println(strings);

        boolean succesRemove = strings.remove(s1);

        System.out.println(strings);

        List<String> removes = new ArrayList<String>();
        removes.add(s2);
        removes.add(s3);
        removes.add(s4);
        boolean succesRemoves = strings.retainAll(removes);

        System.out.println(strings);

    }
}
