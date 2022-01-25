package com.kollarcoding.models;

import org.springframework.stereotype.Component;

@Component // Annotations tells Spring that this is a component that it can create
public class Game {

	
	private String gameID; 

	public String getGameID() { // Allows to generate game ID for POST method we created
		return gameID;
	}

	public Game(String gameID) {
		super();
		this.gameID = gameID;
	}

	public Game() { // default constructor because parameters are not recognized By Spring application without it
		super();
		return;
	}
	
	@Override
	public String toString() {
		return "Game [gameID=" + gameID + "]";
	}


}
