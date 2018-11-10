import React, { Component } from 'react';
import Card from './Card.jsx';

export default class Game extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
      ourCard: 'A',
      theirCard: '3',
      deck: [
      {suit: '&spades;', size: 'A'},
      {suit: '&spades;', size: '2'},
      {suit: '&spades;', size: '3'},
      {suit: '&spades;', size: '4'},
      {suit: '&spades;', size: '5'},
      {suit: '&spades;', size: '6'},
      {suit: '&spades;', size: '7'},
      {suit: '&spades;', size: '8'},
      {suit: '&spades;', size: '9'},
      {suit: '&spades;', size: '10'},
      {suit: '&spades;', size: 'J'},
      {suit: '&spades;', size: 'Q'},
      {suit: '&spades;', size: 'K'},
      {suit: '&hearts;', size: 'A'},
      {suit: '&hearts;', size: '2'},
      {suit: '&hearts;', size: '3'},
      {suit: '&hearts;', size: '4'},
      {suit: '&hearts;', size: '5'},
      {suit: '&hearts;', size: '6'},
      {suit: '&hearts;', size: '7'},
      {suit: '&hearts;', size: '8'},
      {suit: '&hearts;', size: '9'},
      {suit: '&hearts;', size: '10'},
      {suit: '&hearts;', size: 'J'},
      {suit: '&hearts;', size: 'Q'},
      {suit: '&hearts;', size: 'K'},
      {suit: '&diams;', size: 'A'},
      {suit: '&diams;', size: '2'},
      {suit: '&diams;', size: '3'},
      {suit: '&diams;', size: '4'},
      {suit: '&diams;', size: '5'},
      {suit: '&diams;', size: '6'},
      {suit: '&diams;', size: '7'},
      {suit: '&diams;', size: '8'},
      {suit: '&diams;', size: '9'},
      {suit: '&diams;', size: '10'},
      {suit: '&diams;', size: 'J'},
      {suit: '&diams;', size: 'Q'},
      {suit: '&diams;', size: 'K'},
      {suit: '&clubs;', size: 'A'},
      {suit: '&clubs;', size: '2'},
      {suit: '&clubs;', size: '3'},
      {suit: '&clubs;', size: '4'},
      {suit: '&clubs;', size: '5'},
      {suit: '&clubs;', size: '6'},
      {suit: '&clubs;', size: '7'},
      {suit: '&clubs;', size: '8'},
      {suit: 'clubs;', size: '9'},
      {suit: '&clubs;', size: '10'},
      {suit: '&clubs;', size: 'J'},
      {suit: '&clubs;', size: 'Q'},
      {suit: '&clubs;', size: 'K'},
    ]

  	};
  }

  render() {
   const { ourCard } = this.state;
   const { theirCard } = this.state;

   return (
    <div>
    <br></br>
    our card: <Card size='4' suit='h'></Card> &nbsp;
    their card:  <Card size='5' suit='S'></Card>
    </div>
   );
  }
}
