package id.go.depdagri.adminduk.api.domain.base;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public abstract class JsonStringable {

    @JsonIgnore
    public Map<Class<?>, Class<?>> getDefaultMixin() {
        return null;
    }

    public String toJsonString() {
        ObjectMapper objectMapper = new ObjectMapper();
        if (getDefaultMixin() != null) {
            objectMapper.setMixInAnnotations(getDefaultMixin());
        }

        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Exception " + e.getMessage();
        }
    }


    public String toJsonString(Map<Class<?>, Class<?>> mixin) {
        ObjectMapper objectMapper = new ObjectMapper();
        if (mixin != null) {
            objectMapper.setMixInAnnotations(mixin);
        }

        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Exception " + e.getMessage();
        }
    }
}
