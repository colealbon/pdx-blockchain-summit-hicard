import React, { Component } from 'react';
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
    our card: { ourCard } &nbsp;
    their card: { theirCard }
    </div>
   );
  }
}
