package id.go.depdagri.adminduk.util;

import java.io.Serializable;

public class ErrorObject implements Serializable {

    private static final long serialVersionUID = 1L;

    private String msg;
    private Boolean isError = Boolean.FALSE;

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Boolean getError() {
        return isError;
    }

    public void setError(Boolean error) {
        isError = error;
    }
}
