import React from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ShowCard from "./gamePlay/ShowCard";
import ShowHand from "./gamePlay/ShowHand";
import TextNarration from "./gamePlay/TextNarration";
class App extends React.Component {
  initialGameState = {
    initial: true,
    buttonText: "Start Game",//this is the button text
  };
  constructor(props) {//constructor for super
    super(props);
    this.state = this.initialGameState;//equal to line 10
  }
  gameId = "Demo";
  startGame = () => {//call back function with arrow function allowing this to work
    fetch("/games", {//return of a promise connect to api, at the url
      method: this.state.initial ? "POST" : "PUT",//will be a post method, registering a new game, modification made in java for post and put
      body: JSON.stringify({
        //todo: should be 'event'
        gameId: this.gameId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {//succes path, will log info
        let d = data.json();
        return d; //brings back the data, whats getting passed to the next casscade
      })
      .then((game) => {//this method is getting the data
        this.setState({
          // Call setState to create new state, child components are called and game begins
          initial: false,
          game: game,
          gameId: this.gameId,
          buttonText: "Next Turn",//connected to the button
        });
      });
  };
  reStartGame = () => {
    fetch("http://localhost:8080/games", {
      method: "DELETE",
      body: JSON.stringify({
        // todo: should be 'event'
        gameId: this.gameId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        let d = data.json();
        return d;
      })
      .then((game) => {
        this.setState(this.initialGameState);
        this.startGame();
      });
  };
  render() { //set state leads to render
    let pages = [];
    let playerNames = ["Dez", "Allen", "Madalina", "Matt"];
    if (!this.state.initial) {//pushing pages to the array, elements will repeat with diff data
      for (let i = 0; i < this.state.game.hands.length; i++) {
        pages.push(
          // Pushing JSX 'ShowHand'
         
          <ShowHand
            key={i}
            initial={this.state.initial}
            hand={
              this.state.initial
                ? {}//empty object
                : Object.assign({}, this.state.game.hands[i])//otherwise will pull info
            }
            playerNumber={i}
            playerName={playerNames[i]}
          ></ShowHand>
        
        );
      }
    }
    return (
      <div className="App">
        <header className="App-header">
          <ShowCard
            initial={this.state.initial}
            topDiscard={
              this.state.initial
                ? {}
                : Object.assign(
                    {},
                    this.state.game.cardPlayed
                      ? this.state.game.cardPlayed
                      : this.state.game.topDiscard
                  ) //Truthy expression, if cardPlayed active can use it, otherwise use previous topcard
            } //This is the button for start game, when the click method occus this will call it, the return of the players and their hand
          ></ShowCard>
          
          {pages} 
          <Button variant="success" onClick={this.startGame}> 
            {this.state.buttonText}
          </Button>{" "}
        <Button variant="dark" onClick={this.restartGame}>Restart Game</Button>{" "}
        <br />
          <TextNarration
            initial={this.state.initial}
            game={
              Object.assign({}, this.state.game)
            }
            
          ></TextNarration>
        </header>
      </div>
    );
  }
}
export default App;