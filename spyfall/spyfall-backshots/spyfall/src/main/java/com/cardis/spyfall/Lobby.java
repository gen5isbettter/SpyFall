package com.cardis.spyfall;

import java.util.*;

import lombok.*;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@AllArgsConstructor
public class Lobby {

    @JsonProperty
    private String roomcode;

    @JsonProperty
    private List<String> players;

    @JsonProperty
    private boolean hasStarted;

    @JsonProperty
    private List<String> locationSet;

    @JsonProperty
    private int numberOfSpies;
    
    @JsonProperty
    private String location;

    @JsonProperty
    private List<String> spies;

    public Lobby(String roomcode) {
        this.roomcode = roomcode;
        this.players = new ArrayList<>();
        this.hasStarted = false;
        this.locationSet = LocationSets.DEFAULT;
        this.numberOfSpies = 1;
    }

    public void addPlayer(String playerName) {
        this.players.add(playerName);
    }

    public void start() {
        this.hasStarted = true;
        selectLactation();
        selectSpies();
    }

    private void selectLactation() {
        int squidgame = (int)(Math.random()*this.locationSet.size());
        this.location = this.locationSet.get(squidgame);
    }

    private void selectSpies() {
        this.spies = new ArrayList<>();
        while(this.spies.size() < this.numberOfSpies){
            int squidgame = (int)(Math.random()*this.players.size())                                                                          ;
            String playerToAdd = this.players.get(squidgame);
            if(!this.spies.contains(playerToAdd)){
                this.spies.add(playerToAdd);
            }
        }
    }
}