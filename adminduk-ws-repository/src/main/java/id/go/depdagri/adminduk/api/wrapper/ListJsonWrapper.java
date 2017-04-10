package id.go.depdagri.adminduk.api.wrapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import id.go.depdagri.adminduk.api.domain.base.Base;
import java.util.List;
import java.util.Map;

public class ListJsonWrapper<T extends Base> {

    private List<T> list;
    private Class<T> baseClass;

    public ListJsonWrapper(List<T> list, Class<T> baseClass) {
        this.list = list;
        this.baseClass = baseClass;
    }

    public ListJsonWrapper(List<T> list) {
        this.list = list;
    }


    @SuppressWarnings("unchecked")
    public String toJsonString() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            if (baseClass != null) {
                Map<Class<?>, Class<?>> mixin = baseClass.newInstance().getDefaultMixin();
                if (mixin != null) {
                    objectMapper.setMixInAnnotations(mixin);
                }
            }

            return objectMapper.writeValueAsString(list);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Exception " + e.getMessage();
        } catch (InstantiationException e) {
            e.printStackTrace();
            return "Exception " + e.getMessage();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
            return "Exception " + e.getMessage();
        }
    }


    @SuppressWarnings("unchecked")
    public String toJsonString(Map<Class<?>, Class<?>> mixin) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            if (mixin != null) {
                objectMapper.setMixInAnnotations(mixin);
            }

            return objectMapper.writeValueAsString(list);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Exception " + e.getMessage();
        }
    }

}
