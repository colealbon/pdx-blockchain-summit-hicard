import React, { Component } from 'react';
import Card from './Card.jsx';

import shuffle from '../lib/shuffle.js'

let beacon = require('nist-randomness-beacon')



export default class Game extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      deck: [
      {suit: '♠', size: 'A', val: 14},
      {suit: '♠', size: '2', val: 2},
      {suit: '♠', size: '3', val: 3},
      {suit: '♠', size: '4', val: 4},
      {suit: '♠', size: '5', val: 5},
      {suit: '♠', size: '6', val: 6},
      {suit: '♠', size: '7', val: 7},
      {suit: '♠', size: '8', val: 8},
      {suit: '♠', size: '9', val: 9},
      {suit: '♠', size: '10', val: 10},
      {suit: '♠', size: 'J', val: 11},
      {suit: '♠', size: 'Q', val: 12},
      {suit: '♠', size: 'K', val: 13},
      {suit: '♥', size: 'A', val: 14},
      {suit: '♥', size: '2', val: 2},
      {suit: '♥', size: '3', val: 3},
      {suit: '♥', size: '4', val: 4},
      {suit: '♥', size: '5', val: 5},
      {suit: '♥', size: '6', val: 6},
      {suit: '♥', size: '7', val: 7},
      {suit: '♥', size: '8', val: 8},
      {suit: '♥', size: '9', val: 9},
      {suit: '♥', size: '10', val: 10},
      {suit: '♥', size: 'J', val: 11},
      {suit: '♥', size: 'Q', val: 12},
      {suit: '♥', size: 'K', val: 13},
      {suit: '♦', size: 'A', val: 14},
      {suit: '♦', size: '2', val: 2},
      {suit: '♦', size: '3', val: 3},
      {suit: '♦', size: '4', val: 4},
      {suit: '♦', size: '5', val: 5},
      {suit: '♦', size: '6', val: 6},
      {suit: '♦', size: '7', val: 7},
      {suit: '♦', size: '8', val: 8},
      {suit: '♦', size: '9', val: 9},
      {suit: '♦', size: '10', val: 10},
      {suit: '♦', size: 'J', val: 11},
      {suit: '♦', size: 'Q', val: 12},
      {suit: '♦', size: 'K', val: 13},
      {suit: '♣', size: 'A', val: 14},
      {suit: '♣', size: '2', val: 2},
      {suit: '♣', size: '3', val: 3},
      {suit: '♣', size: '4', val: 4},
      {suit: '♣', size: '5', val: 5},
      {suit: '♣', size: '6', val: 6},
      {suit: '♣', size: '7', val: 7},
      {suit: '♣', size: '8', val: 8},
      {suit: '♣', size: '9', val: 9},
      {suit: '♣', size: '10', val: 10},
      {suit: '♣', size: 'J', val: 11},
      {suit: '♣', size: 'Q', val: 12},
      {suit: '♣', size: 'K', val: 13},
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
    winner:  {(theirCard.val == ourCard.val) ? "tie" : ((theirCard.val > ourCard.val) ? 'them' : 'us') }
    </div>
   );
  }
}
