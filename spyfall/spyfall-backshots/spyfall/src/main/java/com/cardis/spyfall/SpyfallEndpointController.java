package com.cardis.spyfall;

import com.cardis.spyfall.exceptions.*;

import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import static com.cardis.spyfall.Constants.LETTERS;
import static com.cardis.spyfall.Config.USE_RANDOM_ROOMCODES;

@CrossOrigin(origins="HTTP://localhost:3000")
@RestController
public class SpyfallEndpointController {

    Map<String,Lobby> lobbies = new HashMap<>();
    ObjectMapper mapper = new ObjectMapper();

    @PostMapping("/lobby")
    public String newLobby(@RequestParam String playerName) throws JsonProcessingException {
        String roomcode = generateRoomcode();
        Lobby lobby = new Lobby(roomcode);
        lobby.addPlayer(playerName);
        lobbies.put(roomcode, lobby);

        System.out.println("Player " + playerName + " is creating new lobby with roomcode = " + roomcode);
        return mapper.writeValueAsString(new Response(200, "womp-womp", lobby));
    }

    @PatchMapping("/lobby")
    public String joinLobby(@RequestParam String playerName, @RequestParam String roomcode) throws JsonProcessingException {
        
        Lobby lobby = lobbies.get(roomcode);

        if(lobby == null) {
            return mapper.writeValueAsString(new Response(420, "Roomcode not found", roomcode));
        }

        if(lobby.getPlayers().contains(playerName)) {
            return mapper.writeValueAsString(new Response(422, "Playername already taken :P", playerName));
        } 

        lobby.addPlayer(playerName);

        System.out.println("Adding player with player name = " + playerName + " to lobby with roomcode = " + roomcode);
        return mapper.writeValueAsString(new Response(200, "don't kill yourself ahaha", lobby));
    }

    @GetMapping("/lobby")
    public String getLobby(@RequestParam String roomcode) throws JsonProcessingException {

        Lobby lobby = lobbies.get(roomcode);

        if(lobby == null) {
            return mapper.writeValueAsString(new Response(420, "Roomcode not found", roomcode));
        }

        return mapper.writeValueAsString(new Response(200, "don't kill yourself ahaha", lobby));
    }

    @GetMapping("/start")
    public String startLobby(@RequestParam String roomcode) throws JsonProcessingException {
        
        Lobby lobby = lobbies.get(roomcode);
        
        if(lobby == null) {
            return mapper.writeValueAsString(new Response(420, "Roomcode not found", roomcode));
        }

        System.out.println("Starting lobby with roomcode = " + roomcode);
        lobby.start();
        return mapper.writeValueAsString(new Response(200, "don't kill yourself ahaha", lobby));
    }

    //create a random 4 digit lobby code that doesn't already exist
    private String generateRoomcode() {
        String code;
        do {
            if(USE_RANDOM_ROOMCODES) {
                code = "";
                while(code.length() < 4) {
                    code += LETTERS[(int)(Math.random()*26)];
                }
            } else {
                code = "ROOM" + (lobbies.size() + 1);
            }
        } while (lobbies.keySet().contains(code));
        return code;
    }
}