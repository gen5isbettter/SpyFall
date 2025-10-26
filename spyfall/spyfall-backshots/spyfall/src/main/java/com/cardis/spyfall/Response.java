package com.cardis.spyfall;

import lombok.*;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@AllArgsConstructor
public class Response {

    @JsonProperty
    int statusCode;

    @JsonProperty
    String message;

    @JsonProperty
    Object payload;

}