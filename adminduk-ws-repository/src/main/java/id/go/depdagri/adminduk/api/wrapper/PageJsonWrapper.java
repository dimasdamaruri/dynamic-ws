package id.go.depdagri.adminduk.api.wrapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import id.go.depdagri.adminduk.api.domain.base.Base;
import java.util.Map;
import org.springframework.data.domain.Page;

public class PageJsonWrapper<T extends Base> {

    private Page<T> page;
    private Class<T> baseClass;

    public PageJsonWrapper(Page<T> page, Class<T> baseClass) {
        this.page = page;
        this.baseClass = baseClass;
    }

    public PageJsonWrapper(Page<T> page) {
        this.page = page;
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

            return objectMapper.writeValueAsString(page);
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

            return objectMapper.writeValueAsString(page);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Exception " + e.getMessage();
        }
    }

}
