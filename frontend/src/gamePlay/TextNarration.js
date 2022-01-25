import React, { Component } from "react";
import FigureCaption from "react-bootstrap/esm/FigureCaption";
import { Figure } from "react-bootstrap";
import translateCard from "../utilities/translateCard";
class TextNarration extends Component {
    render() {
      
      let player;
      if (this.props.game.currentPlayer === 0) {
        player = "Dez";
      } else if (this.props.game.currentPlayer === 1) {
        player = "Allen";
      } else if (this.props.game.currentPlayer === 2) {
        player = "Madalina";
      } else {
        player = "Matt";
      }
  
      
      
      let pages = [];
      if (this.props.initial) {
        pages.push(<p>
          Game has Started
        </p>)
        }
        if(this.props.game.reverse == true) {
            pages.push(
                <p>The play order is reversed</p>
            )
        }
         else {
             pages.push(
                 <p>The play order is normal</p>
             )
         }
      console.log(this.props.game)
      return (<div>
        <p> {player + " is up to play!"} </p>
        
        
        {pages}
      </div>)
      
      
    }
    
}
  export default TextNarration;