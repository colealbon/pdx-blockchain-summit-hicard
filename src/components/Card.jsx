import React, { Component } from 'react';
export default class Card extends Component {
  render() {
   return (
    <div>
    { this.props.suit }
    { this.props.size }
    </div>
   );
  }
}
