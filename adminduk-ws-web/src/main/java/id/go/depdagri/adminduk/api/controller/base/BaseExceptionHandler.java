package id.go.depdagri.adminduk.api.controller.base;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.persistence.NoResultException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class BaseExceptionHandler {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({NoResultException.class})
    public void handle(NoResultException ex, HttpServletResponse response) {
        logger.error(ex.getMessage(), ex);
        response.setHeader("Exception Message", ex.getMessage());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({EmptyResultDataAccessException.class})
    public void handle(EmptyResultDataAccessException ex, HttpServletResponse response) {
        logger.error(ex.getMessage(), ex);
        response.setHeader("Exception Message", ex.getMessage());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({IllegalStateException.class})
    public void handle(IllegalStateException ex, HttpServletResponse response) {
        logger.error(ex.getMessage(), ex);
        response.setHeader("Exception Message", ex.getMessage());
    }

    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public void handle(MethodArgumentNotValidException ex, HttpServletResponse response) throws IOException {
        logger.error(ex.getMessage(), ex);
        Map<String, String> errorMap = new HashMap<String, String>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errorMap.put(error.getField(), error.getDefaultMessage());
        }
        response.setHeader("Exception Message", new ObjectMapper().writeValueAsString(errorMap));
    }

    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    @ExceptionHandler({DataIntegrityViolationException.class})
    public void handle(DataIntegrityViolationException ex, HttpServletResponse response) throws IOException {
        logger.error(ex.getMessage(), ex);
        response.setHeader("Exception Message", ex.getMessage());
    }

    @ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
    @ExceptionHandler({HttpMediaTypeNotSupportedException.class})
    public void handle(HttpMediaTypeNotSupportedException ex, HttpServletResponse response) throws IOException {
        logger.error(ex.getMessage(), ex);
        response.setHeader("Exception Message", ex.getMessage());
    }
}
