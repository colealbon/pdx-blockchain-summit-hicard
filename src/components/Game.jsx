import React, { Component } from 'react';
import Card from './Card.jsx';

import shuffle from '../lib/shuffle.js'

let beacon = require('nist-randomness-beacon')

import axios from 'axios';


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


    //1 was at 2018-07-23T19:26:00.000Z (1532373960)
    //155238 was at 2018-11-11T07:53:00.000Z (1541922780)
    //1541922780/60 - 1532373960/60 ==> 159147
    //so there are some lost minutes.  (about 1.5 seconds every minute)
    //159147-155238

    let guess = Math.floor((timestamp/1000 - 1541922780)/61.5) + 155238

    axios.get('https://s3.amazonaws.com/nist-beacons/' + guess + '.json')
      .then(res => {
        const json = res.data;

        this.reevaluateCard({
          localRandomValue: json.pulse.localRandomValue,
          pulseIndex: json.pulse.pulseIndex
        })
      })
      
  }
  render() {
   const { ourCard } = this.state;
   const { theirCard } = this.state;

   return (
    <div>
    <br></br>
    our card: <Card size={ourCard == null ? "" : ourCard.size} suit={ourCard == null ? "" : ourCard.suit}></Card> &nbsp;
    their card:  <Card size={theirCard == null ? "" :  theirCard.size} suit={theirCard == null ? "" : theirCard.suit}></Card>
    <br></br>
      {theirCard && ourCard &&
        <span>winner:  {(theirCard.val == ourCard.val) ? 'tie' : ((theirCard.val > ourCard.val) ? 'them' : 'us') }</span>
      }
    </div>
   );
  }
}
