package com.cardis.spyfall.exceptions;

import java.lang.RuntimeException;

public class RoomCodeNotFoundException extends RuntimeException {
    
    public RoomCodeNotFoundException() {}

    public RoomCodeNotFoundException(String message) {
        super(message);
    }

    public RoomCodeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public RoomCodeNotFoundException(Throwable cause) {
        super(cause);
    }
}