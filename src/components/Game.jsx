import React, { Component } from 'react';
import Card from './Card.jsx';

import shuffle from '../lib/shuffle.js'

let beacon = require('nist-randomness-beacon')



export default class Game extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
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
      {suit: '&clubs;', size: '9'},
      {suit: '&clubs;', size: '10'},
      {suit: '&clubs;', size: 'J'},
      {suit: '&clubs;', size: 'Q'},
      {suit: '&clubs;', size: 'K'},
    ]

  	};
  }

  reevaluateCard(rando) {

    shuffle(this.state.deck, rando.localRandomValue)
    this.setState({
      ourCard: this.state.deck[0],
      theirCard: this.state.deck[1]
    })
  }

  componentWillMount() {
    let timestamp = Date.now();

    const rando = {
      localRandomValue: '979142837A30C60B7E84351B37626F742197474E23E349D5287C82C63ABF62C3AA272BBB1D013C5EDECB2184E2EB8A901C70DCF59F10A75371E11FB1BB7F21A9'.split('').sort(function(){return 0.5-Math.random()}).join(''),
      pulseIndex: 154703
    }

    this.reevaluateCard(rando)

    /*
    beacon // unusable in a browser
    .getMostRecentPulse()
    .then(res => {
        this.setState({
          localRandomValue: this.pulse.localRandomValue,
          pulseIndex: this.pulse.pulseIndex
        })

    })
    .catch(err => {
      console.error(err)
    })
    */
  }
  render() {
   const { ourCard } = this.state;
   const { theirCard } = this.state;

   return (
    <div>
    <br></br>
    our card: <Card size={ourCard.size} suit={ourCard.suit}></Card> &nbsp;
    their card:  <Card size={theirCard.size} suit={theirCard.suit}></Card>
    <br></br>
    winner:  {(theirCard.size > ourCard.size) ? 'them' : 'us' }
    </div>
   );
  }
}
