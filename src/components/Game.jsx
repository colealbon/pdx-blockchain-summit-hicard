import React, { Component } from 'react';
import Card from './Card.jsx';

export default class Game extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
      ourCard: 'A',
      theirCard: '3'
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
