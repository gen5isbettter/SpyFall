package com.cardis.spyfall.exceptions;

import java.lang.RuntimeException;

public class DuplicatePlayerException extends RuntimeException {
    
    public DuplicatePlayerException() {}

    public DuplicatePlayerException(String message) {
        super(message);
    }

    public DuplicatePlayerException(String message, Throwable cause) {
        super(message, cause);
    }

    public DuplicatePlayerException(Throwable cause) {
        super(cause);
    }
}